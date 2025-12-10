import { useState } from 'react'
import type { User, UserRole } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Mail } from 'lucide-react'
import { toast } from 'sonner'

interface UserRegistrationFormProps {
  onRegister: (user: Omit<User, 'id' | 'createdAt'>) => void
}

const roles: { value: UserRole; label: string }[] = [
  { value: ['ADMIN_ROLE'], label: 'Administrador' },
  { value: ['USER_ROLE'], label: 'Usuario' },
]

export const UserRegistrationForm = ({
  onRegister,
}: UserRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailList: '',
    password: '',
    confirmPassword: '',
    role: ['USER_ROLE'],
    isActive: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo inválido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Por favor corrige los errores del formulario')
      return
    }

    onRegister({
      name: formData.name,
      email: formData.email,
      role: ['USER_ROLE'],
      isActive: formData.isActive,
      assignedEmails: [],
      updatedAt: new Date(),
    })

    // Reset form
    setFormData({
      name: '',
      email: '',
      emailList: '',
      password: '',
      confirmPassword: '',
      role: ['USER_ROLE'],
      isActive: true,
    })
    setErrors({})
  }

  const handleBulkEmailImport = () => {
    const emails = formData.emailList
      .split(/[\n,;]/)
      .map((email) => email.trim())
      .filter((email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))

    if (emails.length === 0) {
      toast.error('No se encontraron correos válidos')
      return
    }

    toast.success(`${emails.length} correos listos para importar`)
  }

  return (
    <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
      <CardHeader className='border-b border-border/50'>
        <CardTitle className='text-lg text-foreground flex items-center gap-2'>
          <UserPlus className='w-5 h-5 text-primary' />
          Registrar Nuevo Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='space-y-2'>
            <Label htmlFor='reg-name' className='text-foreground'>
              Nombre
            </Label>
            <Input
              id='reg-name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='Nombre completo'
            />
            {errors.name && (
              <p className='text-sm text-destructive'>{errors.name}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-email' className='text-foreground'>
              Correo Electrónico
            </Label>
            <Input
              id='reg-email'
              type='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='correo@ejemplo.com'
            />
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='reg-email-list'
              className='text-foreground flex items-center gap-2'
            >
              <Mail className='w-4 h-4' />
              Lista de Correos (opcional)
            </Label>
            <Textarea
              id='reg-email-list'
              value={formData.emailList}
              onChange={(e) =>
                setFormData({ ...formData, emailList: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground min-h-[80px]'
              placeholder='Ingresa múltiples correos separados por coma, punto y coma o salto de línea'
            />
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleBulkEmailImport}
              className='mt-2'
            >
              Validar Lista
            </Button>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-password' className='text-foreground'>
              Contraseña
            </Label>
            <Input
              id='reg-password'
              type='password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='••••••••'
            />
            {errors.password && (
              <p className='text-sm text-destructive'>{errors.password}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-confirm-password' className='text-foreground'>
              Verificar Contraseña
            </Label>
            <Input
              id='reg-confirm-password'
              type='password'
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='••••••••'
            />
            {errors.confirmPassword && (
              <p className='text-sm text-destructive'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reg-role' className='text-foreground'>
              Rol
            </Label>
            <Select
              value={formData.role[0]}
              onValueChange={(value: string) =>
                setFormData({ ...formData, role: [value as UserRole[0]] })
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
            <Label htmlFor='reg-isActive' className='text-foreground'>
              Estado Activo
            </Label>
            <Switch
              id='reg-isActive'
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-primary hover:bg-primary/90'
          >
            <UserPlus className='w-4 h-4 mr-2' />
            Registrar Usuario
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
