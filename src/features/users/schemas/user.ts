import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  role: z.enum(['admin', 'user']).default('user'),
})

export type User = z.infer<typeof userSchema>
