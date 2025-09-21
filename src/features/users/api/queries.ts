import { queryOptions } from '@tanstack/react-query'
import { getUserById, getUsers } from './service'
import type { GetUsersParams } from '../types/services'

export enum UsersQueries {
  GET_USERS = 'GET_USERS',
  GET_USER_BY_ID = 'GET_USER_BY_ID',
}

export const usersQueries = {
  all: (params?: GetUsersParams) =>
    queryOptions({
      queryKey: [UsersQueries.GET_USERS, params],
      queryFn: () => getUsers(params),
    }),

  byId: (id: string) =>
    queryOptions({
      queryKey: [UsersQueries.GET_USER_BY_ID, id],
      queryFn: () => getUserById(id),
      enabled: !!id,
    }),
}
