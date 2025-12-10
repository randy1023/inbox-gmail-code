import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Save, X } from 'lucide-react'
import type { UserRole } from '@/types'
import { useUsersStore } from '../store/users.store'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface UserFormProps {
  onCancel: () => void
}

const roles: { value: UserRole; label: string }[] = [
  { value: ['ADMIN_ROLE'], label: 'Administrador' },
  { value: ['USER_ROLE'], label: 'Usuario' },
]

export const UserForm = ({ onCancel }: UserFormProps) => {
  const { user, formData, setFormData } = useUsersStore()
  const handleValidateEmailImport = () => {
    const emails = formData.assignedEmails.map((email) => {
      const trimmedEmail = email.trim()
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        ? trimmedEmail
        : null
    })

    if (emails.length === 0) {
      toast.error('La lista de correos está vacía')
      return
    }
    if (emails.some((email) => email === null)) {
      toast.error('Hay correos inválidos en la lista')
      return
    }

    toast.success(`${emails.length} correos listos para importar`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    console.log({ ...formData })
    // onSave({
    //   ...user,
    //   ...formData,
    // })
  }

  if (!user) {
    return (
      <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
        <CardContent className='flex items-center justify-center h-64'>
          <p className='text-muted-foreground'>
            Selecciona un usuario para editar
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
      <CardHeader className='border-b border-border/50'>
        <CardTitle className='text-lg text-foreground'>
          Editar Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-foreground'>
              Nombre
            </Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='Nombre completo'
            />
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='reg-email-list'
              className='text-foreground flex items-center gap-2'
            >
              <Mail className='w-4 h-4' />
              Lista de Correos Asignados
            </Label>
            <Textarea
              id='reg-email-list'
              value={formData.assignedEmails.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedEmails: e.target.value
                    .split(/[,\s;]+/) // Corregido el regex
                    .map((email) => email.trim()) // Eliminar espacios en blanco
                    .filter((email) => email !== ''),
                })
              }
              className='bg-background/50 border-border/50 text-foreground min-h-20'
              placeholder='Ingresa múltiples correos separados por coma, punto y coma o salto de línea'
            />
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleValidateEmailImport}
              className='mt-2'
            >
              Validar Lista
            </Button>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='role' className='text-foreground'>
              Rol
            </Label>
            <Select
              value={formData.role[0]}
              onValueChange={(value: string) =>
                setFormData({ ...formData, role: [value] as UserRole })
              }
            >
              <SelectTrigger className='bg-background/50 border-border/50 text-foreground'>
                <SelectValue placeholder='Selecciona un rol' />
              </SelectTrigger>
              <SelectContent className='bg-card border-border/50'>
                {roles.map((role) => (
                  <SelectItem key={role.value[0]} value={role.value[0]}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-between'>
            <Label htmlFor='isActive' className='text-foreground'>
              Estado Activo
            </Label>
            <Switch
              id='isActive'
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <Button
              type='submit'
              className='flex-1 bg-primary hover:bg-primary/90'
            >
              <Save className='w-4 h-4 mr-2' />
              Guardar
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              className='flex-1'
            >
              <X className='w-4 h-4 mr-2' />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
