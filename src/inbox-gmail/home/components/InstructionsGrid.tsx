import { Card } from '@/components/ui/card'
import { CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react'

const instructions = [
  {
    icon: CheckCircle2,
    title: 'Paso 1',
    description:
      'Conecta tu cuenta de Gmail de forma segura y autoriza el acceso a tus correos de verificación.',
  },
  {
    icon: Sparkles,
    title: 'Paso 2',
    description:
      'Nuestra IA identifica automáticamente códigos de acceso, verificaciones y confirmaciones importantes.',
  },
  {
    icon: Shield,
    title: 'Paso 3',
    description:
      'Todos tus códigos se organizan de forma segura y encriptada en tu panel personal.',
  },
  {
    icon: Zap,
    title: 'Paso 4',
    description:
      'Accede instantáneamente a cualquier código cuando lo necesites, desde cualquier dispositivo.',
  },
]
export const InstructionsGrid = () => {
  return (
    <section className='px-6 py-16'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
          Cómo Funciona
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {instructions.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className='bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-elevated group'
              >
                <div className='flex flex-col items-start space-y-4'>
                  <div className='p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                    <Icon className='h-6 w-6 text-primary' />
                  </div>

                  <h3 className='text-xl font-semibold text-foreground'>
                    {item.title}
                  </h3>

                  <p className='text-muted-foreground leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
