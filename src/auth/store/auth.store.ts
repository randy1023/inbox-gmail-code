import { checkAuthAction, loginAction } from '@/actions'
import type { User } from '@/types'
import { create } from 'zustand'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
  //Properties
  user: User | null
  token: string | null
  authSatus: AuthStatus
  //Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  authSatus: 'checking',
  //Actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password)

      localStorage.setItem('token', data.token)
      set({
        user: data.user,
        token: data.token,
        authSatus: 'authenticated',
      })

      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem('token')
      set({
        user: null,
        token: null,
        authSatus: 'not-authenticated',
      })
      return false
    }
  },
  logout: () => {
    localStorage.removeItem('token')
    set({
      user: null,
      token: null,
      authSatus: 'not-authenticated',
    })
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction()

      set({
        user,
        token,
        authSatus: 'authenticated',
      })
      localStorage.setItem('token', token)
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem('token')
      set({
        user: null,
        token: null,
        authSatus: 'not-authenticated',
      })
      return false
    }
  },
}))
