import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { organizationsQueries } from '../api/queries'
import { organizationSchema } from '../schemas/organizations'
import {
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
} from '../api/mutations'
import type { Organization } from '../schemas/organizations'

export const useOrganizationsForm = (
  organizationId?: string,
  onClose?: () => void,
) => {
  const { data: organization } = useQuery(
    organizationsQueries.byId(organizationId || ''),
  )
  const { mutate: create } = useCreateOrganizationMutation(onClose)
  const { mutate: update } = useUpdateOrganizationMutation(onClose)

  const form = useForm<Organization>({
    values: {
      name: organization?.name || '',
      address: organization?.address || '',
      phone: organization?.phone || '',
      domain: organization?.domain || '',
      ai_providers: organization?.ai_providers || [],
    },
    mode: 'onChange',
    resolver: standardSchemaResolver(organizationSchema),
  })

  const handleOrganizationSubmit = form.handleSubmit((data) => {
    if (!organizationId) {
      create(data)
    } else {
      update({ id: organizationId, data })
    }
    form.reset()
  })

  return { form, handleOrganizationSubmit }
}
