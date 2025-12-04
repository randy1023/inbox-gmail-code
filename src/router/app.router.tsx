import { createBrowserRouter } from 'react-router'
import { HomePage, InboxGmailLayout } from '../inbox-gmail'
import { AuthLayout, LoginPages } from '@/auth'
import { HeaderSection } from '@/components/HeaderSection'
import { AuthenticatedRoute } from '@/components/routes/ProtectedRoutes'
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <HeaderSection>
        <AuthLayout />
      </HeaderSection>
    ),
    children: [
      {
        index: true,
        element: <LoginPages />,
      },
      // {
      //   path: '/register',
      //   element: <RegisterPages />,
      // },
    ],
  },

  {
    path: '/home',

    element: (
      <AuthenticatedRoute>
        <InboxGmailLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])
