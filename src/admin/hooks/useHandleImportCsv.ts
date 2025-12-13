import { useRef } from 'react'
import { toast } from 'sonner'

export const useHandleImportCsv = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return toast.error('No se seleccionó ningún archivo')
    if (file.type !== 'text/csv')
      return toast.error('El archivo seleccionado no es un CSV válido')

    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      console.log({ event })
      const text = event.target?.result
      if (typeof text !== 'string' || !text) {
        return toast.error('Error al leer el archivo CSV')
      }
      const lines = text.split('\n').filter((line) => line.trim())
      if (lines.length < 2) return
      toast.error('El archivo CSV está vacío o no tiene datos válidos')

      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
      const id = headers.indexOf('id')
      const email = headers.indexOf('email')
      const password = headers.indexOf('password')

      if (id === -1 || email === -1 || password === -1) {
        return toast.error(
          'El archivo CSV debe contener las columnas: id, email, password'
        )
      }
      console.log({ id, email, password })
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim())
        if (values.length !== headers.length) {
          return toast.error(
            `La fila ${i + 1} no tiene el número correcto de columnas`
          )
        }
        const item = {
          id: values[id] === '' ? undefined : values[id],
          email: values[email],
          password: values[password],
        }
        console.log({ item })
      }
      toast.success('Archivo CSV importado correctamente')
    }
    reader.onerror = () => {
      toast.error('Error al leer el archivo CSV')
    }
    reader.readAsText(file)
    e.target.value = ''
  }
  return {
    fileInputRef,
    handleFileChange,
  }
}
