import { useNavigate } from 'react-router'
import { loginAction } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export const LoginPages = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Tu lógica de login aquí

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const data = await loginAction(email, password)

      localStorage.setItem('token', data.token)
      console.log('redirection at home')
      navigate('/home')
    } catch (error) {
      console.log(error)
      toast.error('Password o/y gmail invalid')
    }
  }
  return (
    <div className=' bg-gradient-dark flex items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl text-center text-amber-50'>
            Iniciar Sesión
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2 text-amber-50'>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='tu@email.com'
                required
              />
            </div>

            <div className='space-y-2 text-amber-50'>
              <Input
                id='password'
                type='password'
                name='password'
                placeholder='password'
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
