import { gmailApi } from '@/api'
import type { GmailsReponse } from '@/types'

export const getGmailsAction = async (
  email: string
): Promise<GmailsReponse[]> => {
  const { data } = await gmailApi.fetchEmails({ email })

  return data
}
