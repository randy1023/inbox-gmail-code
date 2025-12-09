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
import type { GmailsReponse } from '@/types'
import { CustomLoading } from '@/components/CustomLoading'
import { toast } from 'sonner'
import { useFetchGmailsByEmail } from '@/inbox-gmail/hooks/useFetchGmailsByEmail'
import { useEmailStore } from '@/inbox-gmail/store/email.store'

interface VerificationCodesGridProps {
  email: string
}

const serviceConfig: Record<string, { logo: string; color: string }> = {
  Netflix: { logo: '🎬', color: 'from-red-600 to-red-800' },
  'HBO Max': { logo: '📺', color: 'from-purple-600 to-purple-800' },
  'Disney+': { logo: '✨', color: 'from-blue-600 to-blue-800' },
  'Amazon Prime': { logo: '📦', color: 'from-cyan-600 to-cyan-800' },
  Spotify: { logo: '🎵', color: 'from-green-600 to-green-800' },
  'Apple TV+': { logo: '🍎', color: 'from-slate-600 to-slate-800' },
  // Puedes agregar más servicios aquí
}
// Función para enriquecer los datos del backend con logos y colores
const enrichGmailData = (gmailData: GmailsReponse[]) => {
  return gmailData.map((item) => {
    const config = serviceConfig[item.service] || {
      logo: '📧',
      color: 'from-gray-600 to-gray-800',
    }

    return {
      ...item,
      logo: config.logo,
      color: config.color,
      date: formatDateWithAMPM(item.date), // Formatear la fecha
    }
  })
}
const formatDateWithAMPM = (dateString: string): string => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}
export const VerificationCodeGrid = ({ email }: VerificationCodesGridProps) => {
  const { useQueryGmail } = useFetchGmailsByEmail()
  const { emailsWithCode: gmails } = useEmailStore()

  const handleCopyCode = (code: string, service: string) => {
    navigator.clipboard.writeText(code)

    toast.info('Código copiado', {
      description: `Código de ${service} copiado al portapapeles`,
    })
  }

  const enrichedGmails = gmails ? enrichGmailData(gmails) : []
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
        {useQueryGmail.isFetching ? (
          <CustomLoading />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {enrichedGmails.map((item) => (
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
        )}
      </div>
    </section>
  )
}
