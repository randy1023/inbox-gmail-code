import { FormGmail } from '@/inbox-gmail/home/components/FormGmail'
import { HeaderSection } from '@/components/HeaderSection'
import { InstructionsGrid } from '@/inbox-gmail/home/components/InstructionsGrid'
import { VerificationCodeGrid } from '@/inbox-gmail/home/components/VerificationCodeGrid'
import { useEmailStore } from '@/inbox-gmail/store/email.store'

export const HomePage = () => {
  const { showCodes, email } = useEmailStore()

  return (
    <div className='min-h-screen bg-gradient-dark'>
      <HeaderSection>
        <FormGmail />
      </HeaderSection>
      {showCodes ? (
        <VerificationCodeGrid email={email} />
      ) : (
        <InstructionsGrid />
      )}
    </div>
  )
}
