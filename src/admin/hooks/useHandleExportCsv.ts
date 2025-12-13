import { toast } from 'sonner'
import { useCsvStore } from '../store/csv.store'

export const useHandleExportCvs = () => {
  const { exportCsvBlob } = useCsvStore()
  const handleExportCSV = () => {
    console.log(exportCsvBlob)
    if (!exportCsvBlob) {
      toast.error('No hay datos para exportar')
    }

    const url = URL.createObjectURL(exportCsvBlob!)
    const link = document.createElement('a')
    link.href = url
    link.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Archivo CSV exportado correctamente')
  }
  return {
    handleExportCSV,
  }
}
