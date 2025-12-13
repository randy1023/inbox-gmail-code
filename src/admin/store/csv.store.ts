// stores/csv.store.ts
import { exportCsvAction } from '@/actions'
import { create } from 'zustand'

export interface itemFileCsv {
  id?: string
  email: string
  password: string
}

export interface CsvImportState {
  exportCsvBlob: Blob | null
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
  exportFileCsv: () => Promise<Blob>
}

export const useCsvStore = create<CsvImportState>((set) => ({
  exportCsvBlob: null,
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
  exportFileCsv: async () => {
    try {
      const data = await exportCsvAction()

      const text = await data.text()
      const cleanedText = text
        .split('\n')[0]
        .replace(/\\"/g, '')
        .replace(/"/g, '')
      const cleanedTextTwo = cleanedText.split(/\r?\\n/).filter(Boolean)
      const header = [cleanedTextTwo[0]]
      const rows = cleanedTextTwo.slice(1)

      const finalCsv = [header, ...rows].join('\n')

      const blob = new Blob([finalCsv], { type: 'text/csv;charset=utf-8;' })
      set({ exportCsvBlob: blob })
      return blob
    } catch (error) {
      console.log(error)
      return new Blob([], { type: 'text/csv;charset=utf-8;' }) // Return an empty Blob in case of error
    }
  },
}))
