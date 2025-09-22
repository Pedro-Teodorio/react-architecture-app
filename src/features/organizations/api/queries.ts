import type { OrganizationsListSearch } from '../schemas/organizations-list-search'
import { getOrganizations } from './service'

export enum OrganizationsQueryKeys {
  GET_ORGANIZATIONS = 'GET_ORGANIZATIONS',
}

export const organizationsQueries = {
  all: (params?: OrganizationsListSearch) => ({
    queryKey: [OrganizationsQueryKeys.GET_ORGANIZATIONS, params],
    queryFn: () => getOrganizations(params),
  }),
}
