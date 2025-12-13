import { useQuery } from '@tanstack/react-query'
import { useStreamingCredentialStore } from '../store/streaming-credential.store'
import { getStreamingCredentialsAction } from '@/actions'

export const useGetStreamingCredentials = () => {
  const { page, limit, service } = useStreamingCredentialStore()
  const { isFetching: isFetchingCredentials, data: streamingCredentials } =
    useQuery({
      queryKey: [
        'streaming-credentials',
        'page',
        page,
        'limit',
        limit,
        'service',
        service,
      ],
      queryFn: () => getStreamingCredentialsAction(limit, page, service),
      staleTime: 1000 * 60 * 60,
    })
  return {
    isFetchingCredentials,
    streamingCredentials,
  }
}
