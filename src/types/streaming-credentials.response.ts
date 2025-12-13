import type { StreamingCredentialReponse } from './streaming-credential.response'

export interface StreamingCredentialsResponse {
  page: number
  limit: number
  totalEmails: number
  totalPages: number
  emails: StreamingCredentialReponse[]
  next: string
  previous: null
}
