export type UserRole = ['ADMIN_ROLE' | 'USER_ROLE']
export interface AuthResponse {
  user: User
  token: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  assignedEmails: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
