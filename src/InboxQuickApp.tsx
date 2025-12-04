import type { PropsWithChildren } from 'react'
import { RouterProvider } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appRouter } from './router/app.router'
import { Toaster } from 'sonner'
import { CustomFullScreenLoading } from './components/CustomFullScreenLoading'
import { useAuthStore } from './auth/store/auth.store'

// Create a client
const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore()
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1,
  })

  if (isLoading) return <CustomFullScreenLoading />
  return children
}
export const InboxQuickApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {/* Custom provider */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
