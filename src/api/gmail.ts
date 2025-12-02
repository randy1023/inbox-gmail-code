import type { GmailsReponse } from '@/types'
import { api } from './api.base'

export const gmailApi = {
  fetchEmails: () => api.get<GmailsReponse[]>('/gmail'),
}
