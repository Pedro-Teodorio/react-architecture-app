import { UsersTable } from './users-table'

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/shared/page'

export function UsersListPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Usuários</PageTitle>
        <PageDescription>
          Gerencie e filtre os usuários do sistema
        </PageDescription>
      </PageHeader>
      <PageContent>
        <UsersTable />
      </PageContent>
    </PageContainer>
  )
}
