import { loginAction } from '@/actions'
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
      })
      console.log({ email, password })
      return true
    } catch (error) {
      console.log(error)
      localStorage.removeItem('token')
      set({
        user: null,
        token: null,
      })
      return false
    }
  },
  logout: () => {
    localStorage.removeItem('token')
    set({
      user: null,
      token: null,
    })
  },
}))
