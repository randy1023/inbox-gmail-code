import { usersApi } from '@/api'
import type { User } from '@/types'

export const getUserByIdAction = async (id: string): Promise<User> => {
  const { data } = await usersApi.getUserById(id)

  return data
}
