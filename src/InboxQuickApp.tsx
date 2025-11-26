import { RouterProvider } from 'react-router'
import { appRouter } from './router/app.router'

export const InboxQuickApp = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}
