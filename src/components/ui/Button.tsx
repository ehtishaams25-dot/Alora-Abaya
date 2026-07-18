import { type ButtonHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const variantClassName: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-slate-950 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-slate-950',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:outline-slate-500',
}

export function Button({
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClassName[variant],
        className,
      )}
      type={type}
      {...props}
    />
  )
}
