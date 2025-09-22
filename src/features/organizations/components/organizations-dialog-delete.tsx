import { useDeleteOrganizationMutation } from '../api/mutations'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface OrganizationsDialogDeleteProps {
  organizationId?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function OrganizationsDialogDelete({
  onClose,
  isOpen,
  onOpen,
  organizationId,
}: OrganizationsDialogDeleteProps) {
  const { mutate, isPending } = useDeleteOrganizationMutation(onClose)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Organização</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir esta organização?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="btn btn-secondary" asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            loading={isPending}
            disabled={isPending}
            onClick={() => organizationId && mutate(organizationId)}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
