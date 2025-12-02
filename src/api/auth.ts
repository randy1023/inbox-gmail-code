import type { AuthResponse } from '@/types'
import { api } from './api.base'

interface LoginOptions {
  email: string
  password: string
}
interface RegisterOptions {
  name: string
  email: string
  password: string
}

export const authApi = {
  login: ({ email, password }: LoginOptions) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  register: ({ name, email, password }: RegisterOptions) =>
    api.post('/auth/register', { name, email, password }),
}
