import { createBrowserRouter } from 'react-router'
import { HomePage, InboxGmailLayout } from '../inbox-gmail'
import { AuthLayout, LoginPages, RegisterPages } from '@/auth'
import { HeaderSection } from '@/components/HeaderSection'
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
      {
        path: '/register',
        element: <RegisterPages />,
      },
    ],
  },

  {
    path: '/home',
    element: <InboxGmailLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])
