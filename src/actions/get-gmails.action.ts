import { gmailApi } from '@/api'

export const getGmailsAction = async () => {
  const { data } = await gmailApi.fetchEmails()

  return data
}
