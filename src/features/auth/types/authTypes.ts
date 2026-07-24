export interface Customer {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  has_account?: boolean
  metadata?: Record<string, unknown> | null
  created_at?: string
  updated_at?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterDTO {
  email: string
  password: string
  first_name: string
  last_name: string
  phone?: string
}

export interface AuthTokenResponse {
  token: string
}

export interface AuthState {
  customer: Customer | null
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null
}
