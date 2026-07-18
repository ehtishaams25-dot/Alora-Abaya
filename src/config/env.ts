const fallbackApiBaseUrl = 'https://api.example.com'

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl,
} as const
