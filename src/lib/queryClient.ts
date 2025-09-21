import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos antes de ficar “stale”
      gcTime: 1000 * 60 * 30, // 30 minutos em cache
      retry: 1, // tenta 1 vez em caso de erro
      refetchOnWindowFocus: false, // não refaz ao voltar o foco da aba
    },
  },
})
