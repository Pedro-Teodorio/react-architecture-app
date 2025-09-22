import type { Organization } from '../schemas/organizations'

export interface OrganizationsPagination {
  first: number
  prev: null
  next: number
  last: number
  pages: number
  items: number
  data: Array<Organization>
}
