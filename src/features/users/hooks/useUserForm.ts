import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { usersQueries } from '../api/queries'
import { userSchema } from '../schemas/user'
import { useCreateUserMutation, useUpdateUserMutation } from '../api/mutations'
import type { User } from '../schemas/user'

export const useUserForm = (userId?: string, onClose?: () => void) => {
  const { data: user } = useQuery(usersQueries.byId(userId ?? ''))
  const { mutate: create } = useCreateUserMutation(onClose)
  const { mutate: update } = useUpdateUserMutation(onClose)

  const form = useForm<User>({
    values: user || {
      name: '',
      email: '',
      role: 'user',
    },
    resolver: standardSchemaResolver(userSchema),
    mode: 'onChange',
  })
  const handleUserSubmit = form.handleSubmit((data) => {
    if (!userId) {
      create(data)
    } else {
      update({ id: userId, data })
    }
    form.reset()
  })

  return { form, handleUserSubmit }
}
