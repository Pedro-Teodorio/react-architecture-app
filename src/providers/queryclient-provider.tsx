import { QueryClientProvider } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface QueryClientProviderWrapperProps {
  children: ReactNode
  queryClient: QueryClient
}

export function QueryClientProviderWrapper({
  children,
  queryClient,
}: QueryClientProviderWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
