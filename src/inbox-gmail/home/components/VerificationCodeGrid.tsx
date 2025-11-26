import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getGmailsAction } from '@/actions'

interface VerificationCode {
  id: string
  service: string
  code: string
  date: string
  logo: string
  color: string
}

interface VerificationCodesGridProps {
  email: string
}

const mockCodes: VerificationCode[] = [
  {
    id: '1',
    service: 'Netflix',
    code: 'NTX-4829',
    date: 'Hace 2 horas',
    logo: '🎬',
    color: 'from-red-600 to-red-800',
  },
  {
    id: '2',
    service: 'HBO Max',
    code: 'HBO-7156',
    date: 'Hace 5 horas',
    logo: '📺',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: '3',
    service: 'Disney+',
    code: 'DSN-9382',
    date: 'Hace 1 día',
    logo: '✨',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: '4',
    service: 'Amazon Prime',
    code: 'AMZ-5614',
    date: 'Hace 2 días',
    logo: '📦',
    color: 'from-cyan-600 to-cyan-800',
  },
  {
    id: '5',
    service: 'Spotify',
    code: 'SPT-2847',
    date: 'Hace 3 días',
    logo: '🎵',
    color: 'from-green-600 to-green-800',
  },
  {
    id: '6',
    service: 'Apple TV+',
    code: 'APL-8361',
    date: 'Hace 4 días',
    logo: '🍎',
    color: 'from-slate-600 to-slate-800',
  },
]
export const VerificationCodeGrid = ({ email }: VerificationCodesGridProps) => {
  const handleCopyCode = (code: string, service: string) => {
    navigator.clipboard.writeText(code)
    console.log(service)
    // toast({
    //   title: "Código copiado",
    //   description: `Código de ${service} copiado al portapapeles`,
    // });
  }
  const { data } = useQuery({
    queryKey: ['gmails'],
    queryFn: getGmailsAction,
  })

  return (
    <section className='px-6 py-16'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Tus Códigos de Verificación
          </h2>
          <p className='text-muted-foreground'>
            Mostrando códigos para{' '}
            <span className='text-primary font-semibold'>{email}</span>
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {mockCodes.map((item) => (
            <Card
              key={item.id}
              className='bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elevated group overflow-hidden'
            >
              <div className={`h-2 bg-linear-to-r ${item.color}`} />

              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='text-4xl'>{item.logo}</div>
                    <div>
                      <CardTitle className='text-foreground'>
                        {item.service}
                      </CardTitle>
                      <CardDescription>{item.date}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-primary/10 text-primary border-primary/20'
                  >
                    Activo
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className='flex items-center justify-between p-4 bg-muted/50 rounded-lg'>
                  <div>
                    <p className='text-xs text-muted-foreground mb-1'>
                      Código de verificación
                    </p>
                    <p className='text-2xl font-mono font-bold text-foreground tracking-wider'>
                      {item.code}
                    </p>
                  </div>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => handleCopyCode(item.code, item.service)}
                    className='hover:bg-primary/10 hover:text-primary transition-colors text-amber-50'
                  >
                    <Copy className='h-5 w-5' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
