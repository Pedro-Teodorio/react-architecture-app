import type { User } from '../schemas/user'

export interface UsersPagination {
  first: number
  prev: null
  next: number
  last: number
  pages: number
  items: number
  data: Array<User>
}

export interface GetUsersParams {
  _page?: number
  _per_page?: number
}
