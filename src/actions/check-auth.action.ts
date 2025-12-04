import { authApi } from '@/api'
import type { AuthResponse } from '@/types'

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token')

  if (!token) throw new Error('No token found')

  try {
    const { data } = await authApi.checkAuthStatus()

    localStorage.setItem('token', data.token)
    return data
  } catch (error) {
    console.log(error)
    localStorage.removeItem('token')
    throw new Error('Token expired or not valid')
  }
}
