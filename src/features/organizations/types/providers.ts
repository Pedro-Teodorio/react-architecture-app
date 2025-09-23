export interface Provider {
  id: string
  name: string
  description?: string
}

export interface Model {
  id: string
  model: string
  label: string
  ai_provider_id: string
  description?: string
}


