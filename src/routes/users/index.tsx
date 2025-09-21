import { createFileRoute } from '@tanstack/react-router'
import { UsersListPage } from '@/features/users/components/users-list-page'
import { usersQueries } from '@/features/users/api/queries'
import { usersListSearchSchema } from '@/features/users/schemas/users-list-search'

export const Route = createFileRoute('/users/')({
  component: UsersListPage,
  validateSearch: usersListSearchSchema,
  loaderDeps: ({ search: { _page, _per_page } }) => ({ _page, _per_page }),
  loader: ({ context: { queryClient }, deps: { _page, _per_page } }) => {
    queryClient.prefetchQuery(usersQueries.all({ _page, _per_page }))
  },
})
