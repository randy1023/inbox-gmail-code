import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Edit,
  Trash2,
  Users,
  Download,
  Upload,
  MoreVertical,
} from 'lucide-react'
import { useUsersStore } from '../store/users.store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface UsersTableProps {
  selectedUserId: string | null

  onDeleteUser: (userId: string) => void
}

const roleColors = {
  ADMIN_ROLE: 'bg-destructive/20 text-destructive border-destructive/50',
  moderator: 'bg-primary/20 text-primary border-primary/50',
  USER_ROLE: 'bg-muted text-muted-foreground border-border',
}

const roleLabels = {
  ADMIN_ROLE: 'Admin',
  moderator: 'Moderador',
  USER_ROLE: 'Usuario',
}

export const UsersTable = ({
  selectedUserId,
  onDeleteUser,
}: UsersTableProps) => {
  const { users, handleSelectedUser } = useUsersStore()
  return (
    <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
      <CardHeader className='border-b border-border/50'>
        <CardTitle className='text-lg text-foreground flex items-center gap-2'>
          <Users className='w-5 h-5 text-primary' />
          Lista de Usuarios
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='gap-2'>
              <MoreVertical className='w-4 h-4' />
              Opciones
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-popover border-border'>
            <DropdownMenuItem
              onClick={() => {}}
              className='gap-2 cursor-pointer'
            >
              <Upload className='w-4 h-4' />
              Importar CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className='gap-2 cursor-pointer'
            >
              <Download className='w-4 h-4' />
              Exportar CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          // ref={}
          type='file'
          accept='.csv'
          onChange={() => {}}
          className='hidden'
        />
      </CardHeader>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow className='border-border/50 hover:bg-transparent'>
              <TableHead className='text-muted-foreground'>Nombre</TableHead>
              <TableHead className='text-muted-foreground'>Email</TableHead>
              <TableHead className='text-muted-foreground'>Rol</TableHead>
              <TableHead className='text-muted-foreground'>Estado</TableHead>
              <TableHead className='text-muted-foreground text-right'>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className={`border-border/50 cursor-pointer transition-colors ${
                  selectedUserId === user.id
                    ? 'bg-primary/10'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleSelectedUser(user)}
              >
                <TableCell className='font-medium text-foreground'>
                  {user.name}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className={roleColors[user.role[0]]}>
                    {roleLabels[user.role[0]]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm ${
                      user.isActive ? 'text-green-400' : 'text-muted-foreground'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user.isActive ? 'bg-green-400' : 'bg-muted-foreground'
                      }`}
                    />
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectedUser(user)
                      }}
                      className='h-8 w-8 text-primary hover:text-primary hover:bg-primary/20'
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteUser(user.id)
                      }}
                      className='h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/20'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
