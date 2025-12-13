import { csvApi } from '@/api/csv'

export const exportCsvAction = async (): Promise<Blob> => {
  const { data } = await csvApi.exportCsv()
  console.log({ data })
  return data
}
