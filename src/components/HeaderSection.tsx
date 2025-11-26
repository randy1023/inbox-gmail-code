interface HeaderSectionProps {
  children: React.ReactNode
}
export const HeaderSection = ({ children }: HeaderSectionProps) => {
  return (
    <section className='relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-20'>
      <div className='absolute inset-0 bg-gradient-hero pointer-events-none' />

      <div className='relative z-10 w-full max-w-2xl mx-auto text-center space-y-8'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight'>
          <span className='bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Tus Códigos,
          </span>
          <br />
          <span className='bg-linear-to-r from-primary via-primary to-accent bg-clip-text text-transparent'>
            Siempre Disponibles
          </span>
        </h1>

        <p className='text-lg md:text-xl text-muted-foreground max-w-xl mx-auto'>
          Accede a todos tus códigos de verificación y confirmaciones en un solo
          lugar, con estilo.
        </p>

        {children}
      </div>
    </section>
  )
}
