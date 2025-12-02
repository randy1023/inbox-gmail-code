import { authApi } from '@/api'
import type { AuthResponse } from '@/types'

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await authApi.login({ email, password })

    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}
