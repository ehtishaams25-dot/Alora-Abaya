import { useQuery } from '@tanstack/react-query'

import {
  getTemplatePrinciples,
  getTemplateStats,
} from '../services/templateService'

export function useTemplateOverview() {
  const statsQuery = useQuery({
    queryKey: ['template', 'stats'],
    queryFn: getTemplateStats,
  })

  const principlesQuery = useQuery({
    queryKey: ['template', 'principles'],
    queryFn: getTemplatePrinciples,
  })

  return {
    stats: statsQuery.data ?? [],
    principles: principlesQuery.data ?? [],
    isLoading: statsQuery.isLoading || principlesQuery.isLoading,
    isError: statsQuery.isError || principlesQuery.isError,
  }
}
