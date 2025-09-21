import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createUser, deleteUser, updateUser } from './service'
import { UsersQueries } from './queries'
import type { User } from '../schemas/user'
import { queryClient } from '@/lib/queryClient'

enum UsersMutations {
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
}

export function useCreateUserMutation(onClose?: () => void) {
  return useMutation({
    mutationKey: [UsersMutations.CREATE_USER],
    mutationFn: (data: Omit<User, 'id'>) => createUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [UsersQueries.GET_USERS],
      })
      toast.success('Usuário criado com sucesso!')
      onClose?.()
    },
    onError: () => {
      toast.error('Erro ao criar usuário. Tente novamente.')
    },
  })
}

export function useUpdateUserMutation(onClose?: () => void) {
  return useMutation({
    mutationKey: [UsersMutations.UPDATE_USER],
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<User, 'id'>>
    }) => updateUser(id, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [UsersQueries.GET_USERS],
      })

      await queryClient.invalidateQueries({
        queryKey: [UsersQueries.GET_USER_BY_ID, variables.id],
      })

      toast.success('Usuário atualizado com sucesso!')
      onClose?.()
    },
    onError: () => {
      toast.error('Erro ao atualizar usuário. Tente novamente.')
    },
  })
}

export function useDeleteUserMutation(onClose?: () => void) {
  return useMutation({
    mutationKey: [UsersMutations.DELETE_USER],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [UsersQueries.GET_USERS],
      })
      toast.success('Usuário excluído com sucesso!')
      onClose?.()
    },
    onError: () => {
      toast.error('Erro ao excluir usuário. Tente novamente.')
    },
  })
}
