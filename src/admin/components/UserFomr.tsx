import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X } from 'lucide-react'
import { useStreamingCredentialStore } from '../store/streaming-credential.store'

const status: { value: string; label: string }[] = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
]
const services: { value: string; label: string }[] = [
  { value: 'netflix', label: 'Netflix' },
  { value: 'disney', label: 'Disney' },
  { value: 'hbo', label: 'HBO max' },
  { value: 'amazon', label: 'Prime video' },
  { value: 'crunchyroll', label: 'Crunchyroll' },
  { value: 'spotify', label: 'Spotify' },
]

export const UserForm = () => {
  const { streamingCredential, formData, setFormData, handleCancel } =
    useStreamingCredentialStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!streamingCredential) return
    console.log({ ...formData })
    // onSave({
    //   ...user,
    //   ...formData,
    // })
  }

  if (!streamingCredential) {
    return (
      <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
        <CardContent className='flex items-center justify-center h-64'>
          <p className='text-muted-foreground'>
            Selecciona una credencial de streaming para editar
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
      <CardHeader className='border-b border-border/50'>
        <CardTitle className='text-lg text-foreground'>
          Editar credenciales de streaming
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-foreground'>
              Email
            </Label>
            <Input
              id='email'
              value={formData.email}
              type='email'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='Email'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-foreground'>
              Password
            </Label>
            <Input
              id='password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='bg-background/50 border-border/50 text-foreground'
              placeholder='Password'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='service' className='text-foreground'>
              Service
            </Label>
            <Select
              value={formData.service}
              onValueChange={(value: string) =>
                setFormData({ ...formData, service: value })
              }
            >
              <SelectTrigger className='bg-background/50 border-border/50 text-foreground'>
                <SelectValue placeholder='Selecciona un rol' />
              </SelectTrigger>
              <SelectContent className='bg-card border-border/50'>
                {services.map((serv) => (
                  <SelectItem key={serv.value} value={serv.value}>
                    {serv.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='status' className='text-foreground'>
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: string) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className='bg-background/50 border-border/50 text-foreground'>
                <SelectValue placeholder='Selecciona un rol' />
              </SelectTrigger>
              <SelectContent className='bg-card border-border/50'>
                {status.map((statu) => (
                  <SelectItem key={statu.value} value={statu.value}>
                    {statu.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              onClick={handleCancel}
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
