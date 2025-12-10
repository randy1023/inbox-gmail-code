import { usersApi } from '@/api'
import type { User } from '@/types'

export const getAllUsersAction = async (): Promise<User[]> => {
  const users = await usersApi.getAllUsers()
  return users.data
}
