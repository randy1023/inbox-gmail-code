import { getGmailsAction } from '@/actions'
import type { GmailsReponse } from '@/types'
import { create } from 'zustand'

type EmailState = {
  //Properties
  email: string
  emailsWithCode: GmailsReponse[]
  showAssingedEmails: boolean
  assignedEmailsfilter: string[]
  showCodes: boolean
  isLoading: boolean

  //Actions
  getEmails: (email: string) => Promise<boolean>
  setEmail: (inputValue: string) => void
  setShowAssingedEmails: (isShow: boolean) => void
  handleSelectEmail: (selectedEmail: string) => void
  handleFilterAssignedEmail: (emails: string[], email: string) => void
  setShowCodes: (isShow: boolean) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useEmailStore = create<EmailState>()((set) => ({
  email: '',
  emailsWithCode: [],
  showAssingedEmails: false,
  assignedEmailsfilter: [],
  showCodes: false,
  isLoading: false,
  //Actions
  setShowCodes: (isShow: boolean) => {
    set({
      showCodes: isShow,
    })
  },
  setIsLoading: (isLoading: boolean) => {
    set({
      isLoading: isLoading,
    })
  },
  getEmails: async (email: string): Promise<boolean> => {
    try {
      const data = await getGmailsAction(email)
      console.log({ Getema: data })
      set({
        emailsWithCode: data,
      })
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({
        emailsWithCode: [],
      })
      return false
    }
  },
  setEmail: (inputValue: string) => {
    const cleanInputValue = inputValue.trim()
    console.log({ cleanInputValue })
    set({
      email: cleanInputValue,
    })
  },
  setShowAssingedEmails: (isShow: boolean) => {
    set({
      showAssingedEmails: isShow,
    })
  },
  handleSelectEmail: (selectedEmail: string) => {
    console.log(selectedEmail)
    set({
      email: selectedEmail,
      showAssingedEmails: false,
    })
  },
  handleFilterAssignedEmail: (emails: string[], email: string) => {
    if (!email || email.trim() === '') {
      set({
        assignedEmailsfilter: emails,
      })
      return
    }
    const searchTerm = email.toLowerCase().trim()

    set({
      assignedEmailsfilter: emails.filter((e) => {
        const lowerEmail = e.toLowerCase()

        // Coincidencia exacta
        if (lowerEmail === searchTerm) return true

        // Coincidencia parcial
        if (lowerEmail.includes(searchTerm)) return true

        return false
      }),
    })
  },
}))
