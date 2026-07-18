import {
  type TemplatePrinciple,
  type TemplateStat,
} from '../types/template'

const templateStats: TemplateStat[] = [
  { label: 'Core stack', value: 'React + TS', tone: 'blue' },
  { label: 'Styling', value: 'Tailwind', tone: 'green' },
  { label: 'Architecture', value: 'Features', tone: 'rose' },
]

const templatePrinciples: TemplatePrinciple[] = [
  {
    title: 'Feature ownership',
    description:
      'Business domains live in src/features with their own components, hooks, services, types, README, and public index.ts.',
  },
  {
    title: 'Layered logic',
    description:
      'Components render, hooks coordinate state and data fetching, and services own raw HTTP and data mapping.',
  },
  {
    title: 'Typed boundaries',
    description:
      'Use strict TypeScript, avoid any, and export only what other parts of the app actually need.',
  },
]

export function getTemplateStats(): Promise<TemplateStat[]> {
  return Promise.resolve(templateStats)
}

export function getTemplatePrinciples(): Promise<TemplatePrinciple[]> {
  return Promise.resolve(templatePrinciples)
}
