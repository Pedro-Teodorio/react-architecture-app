import { apiClient } from '@/lib/api-instance'
import type { OrganizationsListSearch } from '../schemas/organizations-list-search'
import type { OrganizationsPagination } from '../types/services'

export const getOrganizations = async (
  params?: OrganizationsListSearch,
): Promise<OrganizationsPagination> => {
  const response = await apiClient.get('/organizations', { params })
  return response.data
}
