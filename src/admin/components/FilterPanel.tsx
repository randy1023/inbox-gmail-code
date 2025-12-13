import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter } from 'lucide-react'
import { useStreamingCredentialStore } from '../store/streaming-credential.store'

const LIMIT_OPTIONS = [10, 25, 50, 100]

const STREAMING_SERVICES = [
  { value: 'ALL', label: 'Todos' },
  { value: 'netflix', label: 'Netflix' },
  { value: 'disney', label: 'Disney+' },
  { value: 'hbo', label: 'HBO Max' },
  { value: 'amazon', label: 'Prime Video' },
  { value: 'spotify', label: 'Spotify' },
  { value: 'apple', label: 'Apple TV+' },
]

export const FiltersPanel = () => {
  const { limit, setLimit, service, setService } = useStreamingCredentialStore()
  return (
    <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
      <CardHeader className='border-b border-border/50 py-3'>
        <CardTitle className='text-sm text-foreground flex items-center gap-2'>
          <Filter className='w-4 h-4 text-primary' />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='flex flex-wrap gap-4'>
          <div className='flex flex-col gap-2 min-w-[140px]'>
            <Label htmlFor='limit' className='text-sm text-muted-foreground'>
              Límite
            </Label>
            <Select
              value={limit.toString()}
              onValueChange={(value) => setLimit(parseInt(value))}
            >
              <SelectTrigger id='limit' className='text-amber-50 border-border'>
                <SelectValue placeholder='Seleccionar límite' />
              </SelectTrigger>
              <SelectContent className='bg-background text-amber-50 border-border'>
                {LIMIT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt.toString()}>
                    {opt} registros
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-2 min-w-[180px]'>
            <Label
              htmlFor='streaming'
              className='text-sm text-muted-foreground'
            >
              Servicio de Streaming
            </Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger
                id='streaming'
                className='bg-background text-amber-50 border-border'
              >
                <SelectValue placeholder='Seleccionar servicio' />
              </SelectTrigger>
              <SelectContent className='bg-background text-amber-50 border-border'>
                {STREAMING_SERVICES.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
