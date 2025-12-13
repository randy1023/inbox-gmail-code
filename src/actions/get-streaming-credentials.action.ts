import { streamingCredentialApi } from '@/api'
import type { StreamingCredentialsResponse } from '@/types'

export const getStreamingCredentialsAction = async (
  limit?: number,
  page?: number,
  service?: string
): Promise<StreamingCredentialsResponse> => {
  const { data } = await streamingCredentialApi.getAllStreamingCredentials({
    limit,
    page,
    service,
  })

  return data
}
