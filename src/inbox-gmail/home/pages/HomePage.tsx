import { FormGmail } from '@/inbox-gmail/home/components/FormGmail'
import { HeaderSection } from '@/components/HeaderSection'
import { InstructionsGrid } from '@/inbox-gmail/home/components/InstructionsGrid'
import { VerificationCodeGrid } from '@/inbox-gmail/home/components/VerificationCodeGrid'
import { useState } from 'react'

export const HomePage = () => {
  const [email, setEmail] = useState('')
  const [showCodes, setShowCodes] = useState(false)

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setShowCodes(true)
  }

  return (
    <div className='min-h-screen bg-gradient-dark'>
      <HeaderSection>
        <FormGmail onEmailSubmit={handleEmailSubmit} />
      </HeaderSection>
      {showCodes ? (
        <VerificationCodeGrid email={email} />
      ) : (
        <InstructionsGrid />
      )}
    </div>
  )
}
