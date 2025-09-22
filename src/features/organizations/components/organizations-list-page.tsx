import { PageContainer, PageContent, PageDescription, PageHeader, PageTitle } from "@/components/shared/page";
import { OrganizationsTable } from "./organizations-table";

export function OrganizationsListPage() {
    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Gerenciamento de Organizações</PageTitle>
                <PageDescription>
                    Gerencie e filtre as organizações do sistema
                </PageDescription>
            </PageHeader>
            <PageContent>
                <OrganizationsTable />
            </PageContent>
        </PageContainer>
    )
}