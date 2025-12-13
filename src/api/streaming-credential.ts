import type {
  StreamingCredentialReponse,
  StreamingCredentialsResponse,
} from '@/types'
import { api } from './api.base'
interface createStreamingCredentialOption {
  email: string
  password: string
  service: string
}
interface GetStreamingCredentialsOption {
  limit?: number
  page?: number
  service?: string
}
export const streamingCredentialApi = {
  getAllStreamingCredentials: ({
    limit = 10,
    page = 1,
    service = 'ALL',
  }: GetStreamingCredentialsOption = {}) => {
    return api.get<StreamingCredentialsResponse>(`/emails/streaming-emails`, {
      params: {
        limit,
        page,
        service,
      },
    })
  },
  createStreamingCredential: async (data: createStreamingCredentialOption) =>
    api.post<StreamingCredentialReponse>('/emails/create-email-by-service', {
      data,
    }),
}
