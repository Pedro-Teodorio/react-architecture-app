import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useOrganizationsForm } from '../hooks/useOrganizationsForm'
import { organizationsQueries } from '../api/queries'
import { OrganizationsAIProviderSelector } from './organizations-ai-provider-selector'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface OrganizationDialogFormProps {
  mode: 'create' | 'edit'
  organizationId?: string
  onOpen: () => void
  isOpen: boolean
  onClose: () => void
}

export function OrganizationDialogForm({
  mode,
  isOpen,
  onOpen,
  onClose,
  organizationId,
}: OrganizationDialogFormProps) {
  const { form, handleOrganizationSubmit } = useOrganizationsForm(
    organizationId,
    onClose,
  )
  const { data: models } = useQuery(organizationsQueries.models())
  const { data: providers } = useQuery(organizationsQueries.providers())

  const getProviderName = (providerId: string) => {
    return (
      providers?.find(
        (provider: { id: string; name: string }) => provider.id === providerId,
      )?.name || 'Desconhecido'
    )
  }

  const getModelLabel = (id: string) => {
    return (
      models?.find((model: { id: string; label: string }) => model.id === id)
        ?.label || 'Desconhecido'
    )
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Criar Organização' : `Editar Organização`}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create'
                ? 'Preencha os dados da nova organização.'
                : 'Edite os dados da organização.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleOrganizationSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da organização" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço da organização" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone da organização" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domínio</FormLabel>
                    <FormControl>
                      <Input placeholder="Domínio da organização" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ai_providers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provedores de IA</FormLabel>
                    <FormControl>
                      <OrganizationsAIProviderSelector
                        value={field.value}
                        onChange={field.onChange}
                        onAdd={() => toast.success('Provedor adicionado')}
                        onEdit={(_, provider) =>
                          toast.success(
                            `Provedor ${getProviderName(provider.ai_provider_id)}  editado`,
                          )
                        }
                        onRemove={(index) =>
                          toast.success(
                            `Provedor ${getProviderName(field.value[index].ai_provider_id)} removido`,
                          )
                        }
                        getProviderName={getProviderName}
                        getModelLabel={getModelLabel}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button" onClick={handleClose}>
                    Fechar
                  </Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
