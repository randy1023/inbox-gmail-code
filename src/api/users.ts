import type { User } from '@/types'
import { api } from './api.base'

export const usersApi = {
  getAllUsers: () => api.get<User[]>('/users'),

  getUserById: (id: string) => api.get<User>(`/users/${id}`),
}
