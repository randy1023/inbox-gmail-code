import { useQuery } from '@tanstack/react-query'
import { useStreamingCredentialStore } from '../store/streaming-credential.store'
import { getStreamingCredentialsAction } from '@/actions'

export const useGetStreamingCredentials = () => {
  const { page, limit } = useStreamingCredentialStore()
  const { isFetching: isFetchingCredentials, data: streamingCredentials } =
    useQuery({
      queryKey: ['streaming-credentials', 'page', page],
      queryFn: () => getStreamingCredentialsAction(limit, page),
      staleTime: 1000 * 60 * 60,
    })
  return {
    isFetchingCredentials,
    streamingCredentials,
  }
}
