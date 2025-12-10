import { authApi } from '@/api'
import type { AuthResponse } from '@/types'

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await authApi.login({ email, password })

  return data
}
