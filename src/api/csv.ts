import { api } from './api.base'

export const csvApi = {
  importCsv: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    api.post('/csv/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  exportCsv: () => {
    api.get('/csv/export', { responseType: 'blob' })
  },
}
