import { api } from './api.base'

export const gmailApi = {
  fetchEmails: () => api.get('/gmail'),
}
