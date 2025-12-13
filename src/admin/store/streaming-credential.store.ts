import type { StreamingCredentialReponse } from '@/types'
import { create } from 'zustand'

type FormData = Omit<StreamingCredentialReponse, 'id' | 'createdAt'>

// Datos iniciales del formulario
const initialFormData: FormData = {
  email: '',
  password: '',
  status: 'active',
  service: '',
}

interface createdStriamingCredentialOptions {
  email: string
  password: string
  service: string
}

type StreamingCredentialState = {
  //Properties
  streamingCredential: StreamingCredentialReponse | null
  formData: FormData
  page: number
  limit: number
  //getters

  //Actions
  createStreamingCredential: (
    newCredentials: createdStriamingCredentialOptions
  ) => Promise<StreamingCredentialReponse>
  handleSelectedStreamingCredential: (
    streamingCredential: StreamingCredentialReponse
  ) => void
  setFormData: (data: Partial<FormData>) => void
  handleCancel: () => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export const useStreamingCredentialStore = create<StreamingCredentialState>()(
  (set) => ({
    //Properties

    streamingCredential: null,
    formData: initialFormData,
    page: 1,
    limit: 10,
    // getters

    //Actions
    setPage: (page: number) => {
      set({ page })
    },
    setLimit: (limit: number) => {
      set({ limit })
    },

    createStreamingCredential: async (
      newCredentials: createdStriamingCredentialOptions
    ) => {
      console.log(newCredentials)
      return {
        id: '1',
        email: newCredentials.email,
        password: newCredentials.password,
        service: newCredentials.service,
        status: 'active',
      }
    },
    handleSelectedStreamingCredential: (
      streamingCredential: StreamingCredentialReponse
    ) => {
      const { email, password, service, status } = streamingCredential
      set({
        streamingCredential,
        formData: {
          email,
          password,
          service,
          status,
        },
      })
    },
    setFormData: (data: Partial<FormData>) => {
      set((state) => ({
        formData: { ...state.formData, ...data },
      }))
    },
    handleCancel: () => {
      set({ streamingCredential: null, formData: initialFormData })
    },
  })
)
