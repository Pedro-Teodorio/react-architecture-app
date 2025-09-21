import { apiFactory } from './api-factory'

export const apiClient = apiFactory({
  baseUrl: import.meta.env.VITE_API_URL,
})
