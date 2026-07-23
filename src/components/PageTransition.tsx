import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // elegant custom ease
    >
      {children}
    </motion.div>
  )
}
