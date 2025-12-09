import { useQuery } from '@tanstack/react-query'
import { useEmailStore } from '../store/email.store'

export const useFetchGmailsByEmail = () => {
  const { email, getEmails } = useEmailStore()
  const useQueryGmail = useQuery({
    queryKey: ['emails'],
    enabled: false,
    queryFn: () => getEmails(email),

    retry: 1,
  })

  return {
    useQueryGmail,
  }
}
