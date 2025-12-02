export interface AuthResponse {
  user: User
  token: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string[]
  assignedEmails: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
