import { Button } from '@/components/ui/button'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useExportCsv, useHandleExportCvs, useHandleImportCsv } from '../hooks'
import { useStreamingCredentialStore } from '../store/streaming-credential.store'
import type { StreamingCredentialsResponse } from '@/types'

interface UsersTableProps {
  streamingCredentials?: StreamingCredentialsResponse
  onDeleteUser: (userId: string) => void
}

export const UsersTable = ({
  streamingCredentials,
  onDeleteUser,
}: UsersTableProps) => {
  const { streamingCredential, handleSelectedStreamingCredential } =
    useStreamingCredentialStore()

  useExportCsv()
  const { handleExportCSV } = useHandleExportCvs()
  const { fileInputRef, handleFileChange } = useHandleImportCsv()
  return (
    <Card className='bg-card/50 border-border/50 backdrop-blur-sm'>
      <CardHeader className='border-b border-border/50'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg text-foreground flex items-center gap-2'>
            <Users className='w-5 h-5 text-primary' />
            Lista de Usuarios
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='gap-2 text-amber-50'
              >
                <MoreVertical className='w-4 h-4 text-amber-50' />
                Opciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='bg-background border-border'
            >
              <DropdownMenuItem
                onClick={() => fileInputRef.current?.click()}
                className='gap-2 cursor-pointer text-amber-50'
              >
                <Upload className='w-4 h-4' />
                Importar CSV
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportCSV}
                className='gap-2 cursor-pointer text-amber-50'
              >
                <Download className='w-4 h-4' />
                Exportar CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            ref={fileInputRef}
            type='file'
            accept='.csv'
            onChange={handleFileChange}
            className='hidden'
          />
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow className='border-border/50 hover:bg-transparent'>
              <TableHead className='text-muted-foreground'>Email</TableHead>
              <TableHead className='text-muted-foreground'>Password</TableHead>
              <TableHead className='text-muted-foreground'>service</TableHead>
              <TableHead className='text-muted-foreground'>Status</TableHead>
              {/* <TableHead className='text-muted-foreground text-right'>
                Acciones
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {streamingCredentials?.emails.map((credential) => (
              <TableRow
                key={credential.id}
                className={`border-border/50 cursor-pointer transition-colors ${
                  streamingCredential?.id === credential.id
                    ? 'bg-primary/10'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleSelectedStreamingCredential(credential)}
              >
                <TableCell className='font-medium text-foreground'>
                  {credential.email}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {credential.password}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {credential.service}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm ${
                      credential.status === 'active'
                        ? 'text-green-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        credential.status === 'active'
                          ? 'bg-green-400'
                          : 'bg-muted-foreground'
                      }`}
                    />
                    {credential.status}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation()
                        //  handleSelectedUser(credential)
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
                        onDeleteUser(credential.id)
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
