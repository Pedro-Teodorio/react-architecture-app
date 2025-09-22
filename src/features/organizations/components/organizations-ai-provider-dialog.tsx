import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useQuery } from '@tanstack/react-query'
import { aiProviderSchema } from '../schemas/organizations'
import { organizationsQueries } from '../api/queries'
import type { AiProvider } from '../schemas/organizations'
import {
  Dialog,
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

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Combobox } from '@/components/ui/combobox'

interface OrganizationsAIProviderDialogProps {
  mode: 'create' | 'edit'
  existingProviderIds: Array<string>
  initialData?: AiProvider
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onSubmit: (data: AiProvider) => void
}

export function OrganizationsAIProviderDialog({
  mode,
  initialData,
  isOpen,
  onOpen,
  onClose,
  onSubmit,
  existingProviderIds = [],
}: OrganizationsAIProviderDialogProps) {
  const { data: providers } = useQuery(organizationsQueries.providers())
  const { data: models } = useQuery(organizationsQueries.models())

  const form = useForm<AiProvider>({
    values: initialData || {
      ai_provider_id: '',
      token: '',
      base_url: '',
      ai_models: [],
    },
    mode: 'onChange',
    resolver: standardSchemaResolver(aiProviderSchema),
  })

  const selectedProviderId = form.watch('ai_provider_id')

  const availableProviders =
    providers?.filter(
      (provider: { id: string; name: string }) =>
        !existingProviderIds.includes(provider.id) ||
        provider.id === selectedProviderId,
    ) || []

  const availableModels =
    models?.filter(
      (model: { id: string; ai_provider_id: string }) =>
        model.ai_provider_id === selectedProviderId,
    ) || []

  const handleSubmit = (data: AiProvider) => {
    onSubmit(data)
    onClose()
    form.reset()
  }

  const handleCancel = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar' : 'Criar'} Provedor de IA
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Edite os detalhes do provedor de IA.'
              : 'Adicione um novo provedor de IA à sua organização.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="ai_provider_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provedor de IA</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={mode === 'edit'}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableProviders.map(
                        (provider: { id: string; name: string }) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Token do provedor de IA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="base_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Base</FormLabel>
                  <FormControl>
                    <Input placeholder="URL base (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ai_models"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelos</FormLabel>
                  <FormControl>
                    <div>
                      <Combobox
                        options={availableModels.map(
                          (m: { id: string; model: string }) => ({
                            label: m.model,
                            value: m.id,
                          }),
                        )}
                        value={field.value}
                        onValueChange={field.onChange}
                        multiple
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
                Salvar
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
