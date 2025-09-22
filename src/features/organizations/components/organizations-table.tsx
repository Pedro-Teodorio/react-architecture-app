import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Route } from '@/routes/organizations'
import { useQuery } from '@tanstack/react-query'
import { organizationsQueries } from '../api/queries'
import { useRouter } from '@tanstack/react-router'
import type { PaginationData } from '@/components/shared/pagination'
import { useCallback } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { Organization } from '../schemas/organizations'

export function OrganizationsTable() {
    const router = useRouter()
    const { _page, _per_page } = Route.useSearch()
    const { data, isLoading } = useQuery(organizationsQueries.all({ _page, _per_page }))
    const { data: organizations, items } = data || {}

    const pagination: PaginationData = {
        total: items,
        page: _page || 1,
        perPage: _per_page || 5,
    }

    const handlePageChange = useCallback((page: number) => {
        router.navigate({
            to: '.',
            search: (old) => ({ ...old, _page: page }),
        })
    }, [router])

    const columns: Array<ColumnDef<Organization>> = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Nome' },
        { accessorKey: 'address', header: 'Endereço' },
        { accessorKey: 'phone', header: 'Telefone' },
        { accessorKey: 'domain', header: 'Domínio' },
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
                    <Button onClick={() => { }}>
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
        </>
    )
}