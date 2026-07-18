import { type ReactNode } from 'react'
import { Navigation } from '../components/Navigation'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-sand text-espresso font-sans flex flex-col selection:bg-taupe/20 selection:text-espresso">
      <Navigation />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
    </div>
  )
}
