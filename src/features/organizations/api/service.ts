import type { Organization } from '../schemas/organizations'
import type { OrganizationsListSearch } from '../schemas/organizations-list-search'
import type { OrganizationsPagination } from '../types/services'
import type { Model, Provider } from '../types/providers'
import { apiClient } from '@/lib/api-instance'

export const getOrganizations = async (
  params?: OrganizationsListSearch,
): Promise<OrganizationsPagination> => {
  const response = await apiClient.get('/organizations', { params })
  return response.data
}

export const getOrganizationById = async (id: string) => {
  const response = await apiClient.get(`/organizations/${id}`)
  return response.data
}

export const createOrganization = async (data: Omit<Organization, 'id'>) => {
  const response = await apiClient.post('/organizations', data)
  return response.data
}

export const updateOrganization = async (id: string, data: Organization) => {
  const response = await apiClient.put(`/organizations/${id}`, data)
  return response.data
}

export const deleteOrganization = async (id: string) => {
  const response = await apiClient.delete(`/organizations/${id}`)
  return response.data
}

export const getModels = async (): Promise<Array<Model>> => {
  const response = await apiClient.get('/models')
  return response.data
}

export const getProviders = async (): Promise<Array<Provider>> => {
  const response = await apiClient.get('/providers')
  return response.data
}
