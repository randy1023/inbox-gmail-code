import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router'

export const LoginPages = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Tu lógica de login aquí
    navigate('/home', {})
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
                placeholder='tu@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2 text-amber-50'>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
