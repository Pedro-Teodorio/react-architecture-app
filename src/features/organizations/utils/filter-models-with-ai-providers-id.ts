import type { Model } from '@/features/organizations/types/providers.ts'

export const filterModelsWithAiProvidersId = (
  models: Array<Model>,
  aiProvidersId: string,
): Array<Model> => {
  return models.filter((model) => model.ai_provider_id === aiProvidersId)
}
