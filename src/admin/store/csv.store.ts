// stores/csv.store.ts
import { create } from 'zustand'

export interface itemFileCsv {
  id?: string
  email: string
  password: string
}

export interface CsvImportState {
  importedFileCsv: itemFileCsv[]
  isImporting: boolean
  importErrors: Array<{ row: number; error: string }>
  setImportedUsers: (users: itemFileCsv[]) => void
  addImportedFileCsv: (item: itemFileCsv) => void
  setIsImporting: (isImporting: boolean) => void
  setImportErrors: (errors: Array<{ row: number; error: string }>) => void
  clearImportedUsers: () => void
  clearImportErrors: () => void
  resetImportState: () => void
}

export const useCsvStore = create<CsvImportState>((set) => ({
  importedFileCsv: [],
  isImporting: false,
  importErrors: [],

  setImportedUsers: (fileCsv) => set({ importedFileCsv: fileCsv }),

  addImportedFileCsv: (item) =>
    set((state) => ({ importedFileCsv: [...state.importedFileCsv, item] })),

  setIsImporting: (isImporting) => set({ isImporting }),

  setImportErrors: (errors) => set({ importErrors: errors }),

  clearImportedUsers: () => set({ importedFileCsv: [] }),

  clearImportErrors: () => set({ importErrors: [] }),

  resetImportState: () =>
    set({ importedFileCsv: [], isImporting: false, importErrors: [] }),
}))
