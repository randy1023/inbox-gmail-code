import { useState } from 'react'
import type { User } from '@/types'
import { UsersTable } from './../components/UserTables'
import { UserForm } from './../components/UserFomr'
import { UserRegistrationForm } from './../components/UserRegistrationForm'

import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useUsersStore } from '../store/users.store'
import { CustomLoading } from '@/components/CustomLoading'

const AdminUsers = () => {
  const navigate = useNavigate()
  const { getAllUsers } = useUsersStore()

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  // const handleSelectUser = (user: User) => {
  //   setSelectedUser(user)
  // }

  // const handleSaveUser = (updatedUser: User) => {
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
  //   )
  //   setSelectedUser(null)
  //   toast.success('Usuario actualizado correctamente')
  // }

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

  const handleCancel = () => {
    setSelectedUser(null)
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
          {isLoading ? (
            <CustomLoading />
          ) : (
            <div className='lg:col-span-2'>
              <UsersTable
                selectedUserId={selectedUser?.id ?? null}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          )}
          <div className='lg:col-span-1'>
            <Tabs defaultValue='edit' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 mb-4'>
                <TabsTrigger value='edit'>Editar</TabsTrigger>
                <TabsTrigger value='register'>Registrar</TabsTrigger>
              </TabsList>
              <TabsContent value='edit'>
                <UserForm onCancel={handleCancel} />
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
