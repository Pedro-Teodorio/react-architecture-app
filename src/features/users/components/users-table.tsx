import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { PenBox, Plus, Trash } from 'lucide-react'
import { usersQueries } from '../api/queries'
import { UserDialogForm } from './user-dialog-form'
import { UserDialogDelete } from './user-dialog-delete'
import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '../schemas/user'
import type { PaginationData } from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Route } from '@/routes/users'
import { Button } from '@/components/ui/button'

export function UsersTable() {
  const { _page, _per_page } = Route.useSearch()
  const { data, isLoading } = useQuery(usersQueries.all({ _page, _per_page }))
  const [open, setOpen] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState<string | undefined>(
    undefined,
  )
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const handleDeleteUser = useCallback((idToDelete: string) => {
    setDeleteUserId(idToDelete)
    setConfirmDeleteOpen(true)
  }, [])

  const handleOpenDeleteChange = useCallback((isOpen: boolean) => {
    setConfirmDeleteOpen(isOpen)
    if (!isOpen) {
      setDeleteUserId(undefined)
    }
  }, [])

  const handleUserClick = useCallback((clickedUserId: string) => {
    setMode('edit')
    setUserId(clickedUserId)
    setOpen(true)
  }, [])

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setMode('create')
      setUserId(undefined)
    }
  }, [])

  const { data: users, items } = data || {}

  const router = useRouter()

  const pagination: PaginationData = {
    total: items,
    page: _page || 1,
    perPage: _per_page || 5,
  }

  const handlePaginationChange = useCallback(
    (page: number) => {
      router.navigate({
        to: '.',
        search: (old) => ({ ...old, _page: page }),
      })
    },
    [router],
  )

  const columns: Array<ColumnDef<User>> = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Função',
      cell: ({ row }) => (
        <Badge
          variant={row.getValue('role') === 'admin' ? 'default' : 'secondary'}
        >
          {row.getValue('role')}
        </Badge>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleUserClick(row.getValue('id'))}
          >
            <PenBox className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDeleteUser(row.getValue('id'))}
          >
            <Trash className="size-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os usuários cadastrados no sistema
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenChange(true)}>
            <Plus className="size-4" />
            <span>Novo Usuário</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users || []}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      <UserDialogForm
        mode={mode}
        userId={mode === 'edit' ? userId : undefined}
        isOpen={open}
        onOpen={() => handleOpenChange(true)}
        onClose={() => handleOpenChange(false)}
      />

      <UserDialogDelete
        userId={deleteUserId}
        isOpen={confirmDeleteOpen}
        onOpen={() => handleOpenDeleteChange(true)}
        onClose={() => handleOpenDeleteChange(false)}
      />
    </>
  )
}
