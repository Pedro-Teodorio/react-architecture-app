import { PenBox, Plus, Trash } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { organizationsQueries } from '../api/queries'
import { OrganizationDialogForm } from './organizations-dialog-form'
import { OrganizationsDialogDelete } from './organizations-dialog-delete'
import type { PaginationData } from '@/components/shared/pagination'
import type { ColumnDef } from '@tanstack/react-table'
import type { Organization } from '../schemas/organizations'
import { Route } from '@/routes/organizations'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function OrganizationsTable() {
  const router = useRouter()

  const { _page, _per_page } = Route.useSearch()
  const { data, isLoading } = useQuery(
    organizationsQueries.all({ _page, _per_page }),
  )

  const [isOpen, setIsOpen] = useState(false)
  const [deleteOrganizationId, setDeleteOrganizationId] = useState<
    string | undefined
  >(undefined)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined,
  )

  const handleDeleteOrganization = useCallback((id: string) => {
    setDeleteOrganizationId(id)
    setConfirmDeleteOpen(true)
  }, [])

  const handleOpenDeleteChange = useCallback((open: boolean) => {
    setConfirmDeleteOpen(open)
    if (!open) {
      setDeleteOrganizationId(undefined)
    }
  }, [])

  const handleOrganizationClick = useCallback((id: string) => {
    setMode('edit')
    setOrganizationId(id)
    setIsOpen(true)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setMode('create')
      setOrganizationId(undefined)
    }
  }, [])

  const { data: organizations, items } = data || {}

  const pagination: PaginationData = {
    total: items,
    page: _page || 1,
    perPage: _per_page || 5,
  }

  const handlePageChange = useCallback(
    (page: number) => {
      router.navigate({
        to: '.',
        search: (old) => ({ ...old, _page: page }),
      })
    },
    [router],
  )

  const columns: Array<ColumnDef<Organization>> = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Nome' },
    { accessorKey: 'address', header: 'Endereço' },
    { accessorKey: 'phone', header: 'Telefone' },
    { accessorKey: 'domain', header: 'Domínio' },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOrganizationClick(row.getValue('id'))}
          >
            <PenBox className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleDeleteOrganization(row.getValue('id'))
            }}
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
            <CardTitle>Lista Organizações</CardTitle>
            <CardDescription>
              Visualize e gerencie todas as organizações cadastradas no sistema
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenChange(true)}>
            <Plus className="size-4" />
            <span>Nova Organização</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={organizations || []}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
      <OrganizationDialogForm
        mode={mode}
        organizationId={organizationId}
        isOpen={isOpen}
        onOpen={() => handleOpenChange(true)}
        onClose={() => handleOpenChange(false)}
      />
      <OrganizationsDialogDelete
        organizationId={deleteOrganizationId}
        isOpen={confirmDeleteOpen}
        onOpen={() => handleOpenDeleteChange(true)}
        onClose={() => handleOpenDeleteChange(false)}
      />
    </>
  )
}
