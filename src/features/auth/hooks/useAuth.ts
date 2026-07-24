import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import type { Customer, LoginCredentials, RegisterDTO } from '../types/authTypes'

export const AUTH_QUERY_KEY = ['customer'] as const

/**
 * Fetch current authenticated customer session
 */
export const useCustomer = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => authService.getCurrentCustomer(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Mutation hook for customer login
 */
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (customer: Customer | null) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, customer)
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
    },
  })
}

/**
 * Mutation hook for customer registration
 */
export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterDTO) => authService.register(data),
    onSuccess: (customer: Customer | null) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, customer)
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
    },
  })
}

/**
 * Mutation hook for customer logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null)
    },
    onSettled: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null)
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
    },
  })
}
