import type { User } from '../schemas/user'
import type { GetUsersParams, UsersPagination } from '../types/services'
import { apiClient } from '@/lib/api-instance'

export const getUsers = async (
  params?: GetUsersParams,
): Promise<UsersPagination> => {
  const response = await apiClient.get('/users', { params })
  return response.data
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data
}

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await apiClient.post('/users', user)
  return response.data
}

export const updateUser = async (
  id: string,
  user: Partial<Omit<User, 'id'>>,
): Promise<User> => {
  const response = await apiClient.put(`/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`)
}
