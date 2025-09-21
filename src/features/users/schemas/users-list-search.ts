import { z } from 'zod'

export const usersListSearchSchema = z.object({
  _page: z.number().optional().default(1),
  _per_page: z.number().optional().default(5),
})
