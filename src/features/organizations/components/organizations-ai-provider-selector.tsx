import { PenBox, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { organizationsQueries } from '../api/queries'
import { filterModelsWithAiProvidersId } from '../utils/filter-models-with-ai-providers-id'
import { OrganizationsAIProviderDialog } from './organizations-ai-provider-dialog'
import type { AiProvider } from '../schemas/organizations'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface OrganizationsAIProviderSelectorProps {
  value?: Array<AiProvider>
  onChange?: (value: Array<AiProvider>) => void
  onAdd?: (value: AiProvider) => void
  onEdit?: (index: number, value: AiProvider) => void
  onRemove?: (index: number) => void
  getProviderName: (providerId: string) => string
  getModelLabel: (modelId: string) => string
}

export function OrganizationsAIProviderSelector({
  value = [],
  onChange,
  onAdd,
  onRemove,
  onEdit,
  getProviderName,
  getModelLabel,
}: OrganizationsAIProviderSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  // Buscar todos os modelos disponíveis
  const { data: models = [] } = useQuery(organizationsQueries.models())

  const handleAdd = () => {
    setEditingIndex(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsDialogOpen(true)
  }

  const handleSave = (data: AiProvider) => {
    const newValue = [...value]

    if (editingIndex !== null) {
      newValue[editingIndex] = data
      onEdit?.(editingIndex, data)
    } else {
      newValue.push(data)
      onAdd?.(data)
    }

    onChange?.(newValue)

    setIsDialogOpen(false)
    setEditingIndex(null)
  }

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index)

    onRemove?.(index)

    onChange?.(newValue)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setEditingIndex(null)
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-2">
          <div className="space-y-1">
            <CardTitle>Seleção de Provedor de IA</CardTitle>
            <CardDescription>
              Selecione e configure provedores de IA para sua organização.
            </CardDescription>
          </div>
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAdd}
            >
              <Plus className="size-icon" />
              Adicionar Provedor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {value.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum provedor de IA adicionado.
            </p>
          ) : (
            value.map((field, index) => (
              <Card className="flex" key={index}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="uppercase">
                      {getProviderName(field.ai_provider_id)}
                    </span>
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => handleEdit(index)}
                      >
                        <PenBox />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => handleRemove(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription className="flex gap-2">
                    {filterModelsWithAiProvidersId(models, field.ai_provider_id)
                      .filter((model) => field.ai_models.includes(model.id))
                      .map((model) => (
                        <Badge variant="default" key={model.id}>
                          {getModelLabel(model.id)}
                        </Badge>
                      ))}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <OrganizationsAIProviderDialog
        mode={editingIndex !== null ? 'edit' : 'create'}
        existingProviderIds={value.map((v) => v.ai_provider_id)}
        initialData={editingIndex !== null ? value[editingIndex] : undefined}
        isOpen={isDialogOpen}
        onOpen={() => setIsDialogOpen(true)}
        onClose={handleCancel}
        onSubmit={handleSave}
      />
    </>
  )
}
