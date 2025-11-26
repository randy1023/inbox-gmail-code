import { Mail } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
interface FormaGmailProps {
  onEmailSubmit: (email: string) => void
}
export const FormGmail = ({ onEmailSubmit }: FormaGmailProps) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      //   toast({
      //     title: "Error",
      //     description: "Por favor ingresa un correo electrónico",
      //     variant: "destructive",
      //   });
      return
    }
    onEmailSubmit(email)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
    >
      <div className='relative flex-1'>
        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
        <Input
          type='email'
          placeholder='tu@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='pl-10 h-12 bg-card border-border  text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
        />
      </div>
      <Button
        type='submit'
        size='lg'
        className='h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all hover:scale-105'
      >
        Comenzar
      </Button>
    </form>
  )
}
