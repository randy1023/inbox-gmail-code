import type { GmailsReponse } from '@/types'
import { api } from './api.base'
interface GmailOptions {
  email: string
}
export const gmailApi = {
  fetchEmails: ({ email }: GmailOptions) =>
    api.post<GmailsReponse[]>('/gmail', { email }),
}
