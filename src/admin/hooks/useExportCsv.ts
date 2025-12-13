import { useQuery } from '@tanstack/react-query'

import { useCsvStore } from '../store/csv.store'

export const useExportCsv = () => {
  const { exportFileCsv } = useCsvStore()
  const useQueryExportCsv = useQuery({
    queryKey: ['export-csv'],
    queryFn: exportFileCsv,
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    retry: 1,
  })

  return {
    useQueryExportCsv,
  }
}
