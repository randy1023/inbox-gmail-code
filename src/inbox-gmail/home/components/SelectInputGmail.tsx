import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { Input } from './../../../components/ui/input'
import { useAuthStore } from '@/auth/store/auth.store'
import { useEmailStore } from '@/inbox-gmail/store/email.store'

export const SelectInputGmail = () => {
  const { user } = useAuthStore()
  const {
    email,
    setEmail,
    showAssingedEmails,
    setShowAssingedEmails,
    handleSelectEmail,
    handleFilterAssignedEmail,
    assignedEmailsfilter,
  } = useEmailStore()

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowAssingedEmails(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  useEffect(() => {
    if (user) {
      handleFilterAssignedEmail(user?.assignedEmails, email)
    }
  }, [user, email, handleFilterAssignedEmail])

  return (
    <div className='relative flex-1' ref={wrapperRef}>
      <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />

      <Input
        type='email'
        placeholder='tu@email.com'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setShowAssingedEmails(true)
        }}
        onFocus={() => setShowAssingedEmails(true)}
        className='pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
      />

      {showAssingedEmails && user && assignedEmailsfilter.length > 0 && (
        <div className='absolute z-50 w-full mt-1  border bg-background dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto'>
          {user?.assignedEmails.map((assignedEmail) => (
            <div
              key={assignedEmail}
              className='px-4 py-3 hover:bg-accent-foreground dark:hover:bg-gray-700 cursor-pointer transition-colors'
              onClick={() => handleSelectEmail(assignedEmail)}
            >
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-gray-400' />
                <span className='text-sm'>{assignedEmail}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
