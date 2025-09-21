import { useDeleteUserMutation } from '../api/mutations'
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

interface UserDialogDeleteProps {
  userId?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function UserDialogDelete({
  onClose,
  isOpen,
  onOpen,
  userId,
}: UserDialogDeleteProps) {
  const { mutate, isPending } = useDeleteUserMutation(onClose)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Usuário</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este usuário?
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
            onClick={() => userId && mutate(userId)}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
