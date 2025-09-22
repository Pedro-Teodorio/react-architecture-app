import { z } from 'zod'

export const organizationsListSearchSchema = z.object({
  _page: z.number().optional().default(1),
  _per_page: z.number().optional().default(5),
})

export type OrganizationsListSearch = z.infer<
  typeof organizationsListSearchSchema
>
