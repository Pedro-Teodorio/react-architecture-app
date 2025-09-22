import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from './service'
import { OrganizationsQueryKeys } from './queries'
import type { Organization } from '../schemas/organizations'
import { queryClient } from '@/lib/queryClient'

enum OrganizationMutationKeys {
  CREATE_ORGANIZATION = 'CREATE_ORGANIZATION',
  UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION',
}

export function useCreateOrganizationMutation(onClose?: () => void) {
  return useMutation({
    mutationKey: [OrganizationMutationKeys.CREATE_ORGANIZATION],
    mutationFn: (data: Omit<Organization, 'id'>) => createOrganization(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [OrganizationsQueryKeys.GET_ORGANIZATIONS],
      })
      toast.success('Organização criada com sucesso!')
      onClose?.()
    },
    onError: () => {
      toast.error('Erro ao criar organização. Tente novamente.')
    },
  })
}

export function useUpdateOrganizationMutation(onClose?: () => void) {
  return useMutation({
    mutationKey: [OrganizationMutationKeys.UPDATE_ORGANIZATION],
    mutationFn: ({ id, data }: { id: string; data: Organization }) =>
      updateOrganization(id, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [OrganizationsQueryKeys.GET_ORGANIZATIONS],
      })
      await queryClient.invalidateQueries({
        queryKey: [
          OrganizationsQueryKeys.GET_ORGANIZATIONS_BY_ID,
          variables.id,
        ],
      })
      toast.success('Organização atualizada com sucesso!')
      onClose?.()
    },
    onError: () => {
      toast.error('Erro ao atualizar organização. Tente novamente.')
    },
  })
}

export function useDeleteOrganizationMutation(onClose?: () => void) {
  return useMutation({
    mutationKey: [OrganizationMutationKeys.UPDATE_ORGANIZATION],
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [OrganizationsQueryKeys.GET_ORGANIZATIONS],
      })

      toast.success('Organização excluída com sucesso!')
      onClose?.()
    },
    onError: () => {
      toast.error('Erro ao excluir organização. Tente novamente.')
    },
  })
}
