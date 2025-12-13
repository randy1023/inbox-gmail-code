import type { User } from '@/types'
import { UsersTable } from './../components/UserTables'
import { UserForm } from './../components/UserFomr'
import { UserRegistrationForm } from './../components/UserRegistrationForm'
import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router'
import { CustomLoading } from '@/components/CustomLoading'
import { PaginationStreamingCredentials } from '../components/PaginationStreamingCredentials'
import { useGetStreamingCredentials } from '../hooks'

const AdminUsers = () => {
  const navigate = useNavigate()
  const { isFetchingCredentials, streamingCredentials } =
    useGetStreamingCredentials()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteUser = (userId: string) => {
    // setUsers((prev) => prev.filter((u) => u.id !== userId))
    // if (selectedUser?.id === userId) {
    //   setSelectedUser(null)
    // }
    // toast.success('Usuario eliminado correctamente')
  }

  const handleRegisterUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    console.log(newUser)
    // setUsers((prev) => [newUser, ...prev])
    // toast.success('Usuario registrado correctamente')
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => navigate('/home')}
            className='text-muted-foreground hover:text-foreground'
          >
            <ArrowLeft className='w-5 h-5' />
          </Button>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-primary/20'>
              <Shield className='w-6 h-6 text-primary' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-foreground'>
                Panel de Administración
              </h1>
              <p className='text-sm text-muted-foreground'>
                Gestión de usuarios del sistema
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {isFetchingCredentials ? (
            <CustomLoading />
          ) : (
            <div className='lg:col-span-2'>
              <UsersTable
                streamingCredentials={streamingCredentials}
                onDeleteUser={handleDeleteUser}
              />
              <div className='py-8'>
                <PaginationStreamingCredentials
                  totalPages={streamingCredentials?.totalPages ?? 0}
                />
              </div>
            </div>
          )}

          <div className='lg:col-span-1'>
            <Tabs defaultValue='edit' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 mb-4'>
                <TabsTrigger value='edit'>Editar</TabsTrigger>
                <TabsTrigger value='register'>Registrar</TabsTrigger>
              </TabsList>
              <TabsContent value='edit'>
                <UserForm />
              </TabsContent>
              <TabsContent value='register'>
                <UserRegistrationForm onRegister={handleRegisterUser} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
