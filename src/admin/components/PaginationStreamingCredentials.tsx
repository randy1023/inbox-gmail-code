import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStreamingCredentialStore } from '../store/streaming-credential.store'
interface Props {
  totalPages: number
}
export const PaginationStreamingCredentials = ({ totalPages }: Props) => {
  const { setPage, page } = useStreamingCredentialStore()

  return (
    <div className='flex items-center justify-center space-x-2'>
      <Button
        variant={'outline'}
        size={'sm'}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className='h-4 w-4' />
        Previus
      </Button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? 'default' : 'outline'}
          size={'sm'}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant={'outline'}
        size={'sm'}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight className='h-4 w-4' />
        Next
      </Button>
    </div>
  )
}
