import { Button } from '../ui/button'

export interface PaginationData {
  total?: number
  page?: number
  perPage?: number
}

interface PaginationProps {
  pagination: PaginationData
  onPageChange?: (page: number) => void
}

export function Pagination({
  pagination: { total = 0, page = 1, perPage = 5 },
  onPageChange,
}: PaginationProps) {
  const canPreviousPage = page > 1
  const canNextPage = page < Math.ceil(total / perPage)

  return (
    <div className="flex items-center justify-between ">
      <p className="text-sm text-muted-foreground">Total de {total} item(s)</p>
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground w-full">{`Página ${page} de ${Math.ceil(total / perPage)}`}</p>
        <div className="flex items-center gap-4 ">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            disabled={!canPreviousPage}
            onClick={() => onPageChange?.(page - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            disabled={!canNextPage}
            onClick={() => onPageChange?.(page + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
