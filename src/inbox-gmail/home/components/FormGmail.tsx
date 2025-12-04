import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'

import { SelectInputGmail } from './SelectInputGmail'
import { useEmailStore } from '@/inbox-gmail/store/email.store'
import { useAuthStore } from '@/auth/store/auth.store'
import { useQuery } from '@tanstack/react-query'

export const FormGmail = () => {
  const { user } = useAuthStore()
  const { email, getEmails, setShowCodes } = useEmailStore()

  const { refetch } = useQuery({
    queryKey: ['emails'],
    queryFn: () => getEmails(email),
    enabled: false,
    retry: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !user?.assignedEmails.includes(email)) {
      toast.error('Email seleccionado no valido. Selecciona un email asignado')
      return
    }
    try {
      await refetch()
      setShowCodes(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
    >
      <div className='relative flex-1'>
        <SelectInputGmail />
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
