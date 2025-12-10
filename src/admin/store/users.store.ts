import { getAllUsersAction, getUserByIdAction } from '@/actions'
import type { User } from '@/types'
import { create } from 'zustand'

type FormData = Omit<User, 'id' | 'createdAt'>

// Datos iniciales del formulario
const initialFormData: FormData = {
  name: '',
  email: '',
  role: ['USER_ROLE'],
  isActive: true,
  assignedEmails: [],
  updatedAt: new Date(),
}

type UserState = {
  //Properties
  users: User[]
  user: User | null
  formData: FormData
  //getters

  //Actions
  getAllUsers: () => Promise<User[]>
  getUsersById: (id: string) => Promise<User>
  handleSelectedUser: (user: User) => void
  setFormData: (data: Partial<FormData>) => void
}

export const useUsersStore = create<UserState>()((set) => ({
  //Properties
  users: [],
  user: null,
  formData: initialFormData,

  // getters

  //Actions
  getAllUsers: async () => {
    const users = await getAllUsersAction()
    set({ users })
    return users
  },
  getUsersById: async (id: string) => {
    const user = await getUserByIdAction(id)
    return user
  },
  handleSelectedUser: (user: User) => {
    const { name, email, assignedEmails, isActive, role } = user
    set({
      user,
      formData: {
        name,
        email,
        assignedEmails,
        isActive,
        updatedAt: new Date(),
        role,
      },
    })
  },
  setFormData: (data: Partial<FormData>) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }))
  },
}))
