import {
  getModels,
  getOrganizationById,
  getOrganizations,
  getProviders,
} from './service'
import type { OrganizationsListSearch } from '../schemas/organizations-list-search'

export enum OrganizationsQueryKeys {
  GET_ORGANIZATIONS = 'GET_ORGANIZATIONS',
  GET_ORGANIZATIONS_BY_ID = 'GET_ORGANIZATIONS_BY_ID',
  GET_MODELS = 'GET_MODELS',
  GET_PROVIDERS = 'GET_PROVIDERS',
}

export const organizationsQueries = {
  all: (params?: OrganizationsListSearch) => ({
    queryKey: [OrganizationsQueryKeys.GET_ORGANIZATIONS, params],
    queryFn: () => getOrganizations(params),
  }),
  byId: (id: string) => ({
    queryKey: [OrganizationsQueryKeys.GET_ORGANIZATIONS_BY_ID, id],
    queryFn: () => getOrganizationById(id),
  }),

  models: () => ({
    queryKey: [OrganizationsQueryKeys.GET_MODELS],
    queryFn: () => getModels(),
  }),

  providers: () => ({
    queryKey: [OrganizationsQueryKeys.GET_PROVIDERS],
    queryFn: () => getProviders(),
  }),
}
