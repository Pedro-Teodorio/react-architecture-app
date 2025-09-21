import axios from 'axios'

interface ApiFactory {
  baseUrl: string
  timeout?: number
  headers?: Record<string, string>
}

export const apiFactory = ({
  baseUrl,
  timeout = 30000,
  headers = { 'Content-Type': 'application/json' },
}: ApiFactory) => {
  const api = axios.create({
    baseURL: baseUrl,
    timeout,
    headers,
  })
  return api
}
