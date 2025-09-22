import { z } from 'zod'

export const aiProviderSchema = z.object({
  ai_provider_id: z.string().min(1, 'Provedor é obrigatório'),
  token: z.string().min(1, 'Token é obrigatório'),
  ai_models: z
    .array(z.string())
    .min(1, 'Pelo menos um modelo deve ser selecionado'),
  base_url: z.url('URL base deve ser válida').optional(),
})

export const organizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  domain: z.url('Domínio inválido').min(1, 'Domínio é obrigatório'),
  ai_providers: z
    .array(aiProviderSchema)
    .min(1, 'Pelo menos um provedor deve ser adicionado')
    .default([]),
})

export type Organization = z.infer<typeof organizationSchema>
export type AiProvider = z.infer<typeof aiProviderSchema>
