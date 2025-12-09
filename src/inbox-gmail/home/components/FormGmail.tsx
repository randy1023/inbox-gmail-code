import { useAuthStore } from '@/auth/store/auth.store'
import { Button } from '../../../components/ui/button'
import { SelectInputGmail } from './SelectInputGmail'
import { useEmailStore } from '@/inbox-gmail/store/email.store'
import { toast } from 'sonner'
import { useFetchGmailsByEmail } from '@/inbox-gmail/hooks/useFetchGmailsByEmail'

export const FormGmail = () => {
  const { user } = useAuthStore()
  const { useQueryGmail } = useFetchGmailsByEmail()
  const { email, handleSelectEmail, setShowCodes } = useEmailStore()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !user?.assignedEmails.includes(email)) {
      toast.error('Email seleccionado no valido. Selecciona un email asignado')
      return
    }
    handleSelectEmail(email)
    setShowCodes(true)
  }
  return (
    <form
      onSubmit={async (e) => {
        handleSubmit(e)
        await useQueryGmail.refetch()
      }}
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
