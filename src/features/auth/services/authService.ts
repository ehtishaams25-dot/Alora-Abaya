import { medusa, getAuthToken, setAuthToken, removeAuthToken } from '@/config/medusa'
import type { Customer, LoginCredentials, RegisterDTO } from '../types/authTypes'

export const authService = {
  /**
   * Authenticate customer with email and password using Medusa Store API
   */
  async login(credentials: LoginCredentials): Promise<Customer | null> {
    try {
      // sdk.auth.login(actor, method, payload)
      const token = await medusa.auth.login('customer', 'emailpass', {
        email: credentials.email,
        password: credentials.password,
      })

      if (typeof token === 'string') {
        setAuthToken(token)
      } else if (typeof token === 'object' && token !== null && 'token' in token) {
        setAuthToken((token as { token: string }).token)
      }

      return await this.getCurrentCustomer()
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Invalid authentication credentials'
      )
    }
  },

  /**
   * Register a new customer in Medusa
   */
  async register(data: RegisterDTO): Promise<Customer | null> {
    try {
      // 1. Obtain registration token from Medusa Auth
      const regToken = await medusa.auth.register('customer', 'emailpass', {
        email: data.email,
        password: data.password,
      })

      if (typeof regToken === 'string') {
        setAuthToken(regToken)
      }

      // 2. Create customer profile
      const currentToken = getAuthToken()
      const headers = currentToken ? { authorization: `Bearer ${currentToken}` } : undefined

      await medusa.store.customer.create(
        {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
        },
        undefined,
        headers
      )

      // 3. Login to finalize customer session
      return await this.login({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to register customer account'
      )
    }
  },

  /**
   * Fetch current authenticated customer
   */
  async getCurrentCustomer(): Promise<Customer | null> {
    const token = getAuthToken()
    try {
      const headers = token ? { authorization: `Bearer ${token}` } : undefined
      const response = await medusa.store.customer.retrieve({}, headers)

      if (!response.customer) return null

      return {
        id: response.customer.id,
        email: response.customer.email,
        first_name: response.customer.first_name ?? null,
        last_name: response.customer.last_name ?? null,
        phone: response.customer.phone ?? null,
        has_account: response.customer.has_account ?? true,
        metadata: response.customer.metadata as Record<string, unknown> | null,
        created_at: response.customer.created_at,
        updated_at: response.customer.updated_at,
      }
    } catch {
      return null
    }
  },

  /**
   * Logout current customer
   */
  async logout(): Promise<void> {
    removeAuthToken()
  },
}
