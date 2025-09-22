import { createFileRoute } from '@tanstack/react-router'
import { organizationsQueries } from '@/features/organizations/api/queries'
import { OrganizationsListPage } from '@/features/organizations/components/organizations-list-page'
import { organizationsListSearchSchema } from '@/features/organizations/schemas/organizations-list-search'

export const Route = createFileRoute('/organizations/')({
  component: OrganizationsListPage,
  validateSearch: organizationsListSearchSchema,
  loaderDeps: ({ search: { _page, _per_page } }) => ({ _page, _per_page }),
  loader: ({ context: { queryClient }, deps: { _page, _per_page } }) => {
    queryClient.prefetchQuery(organizationsQueries.all({ _page, _per_page }))
    queryClient.prefetchQuery(organizationsQueries.models())
    queryClient.prefetchQuery(organizationsQueries.providers())
  },
})
