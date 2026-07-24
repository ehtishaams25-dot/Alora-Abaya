import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useLogin } from '../hooks/useAuth'

interface LoginFormProps {
  onSuccess?: () => void
  onToggleRegister?: () => void
}

export function LoginForm({ onSuccess, onToggleRegister }: LoginFormProps) {
  const { t } = useTranslation()
  const { mutate: login, isPending, error: loginError } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return

    login(
      { email, password },
      {
        onSuccess: () => {
          onSuccess?.()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full shrink-0">
      {loginError && (
        <div className="p-3 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs font-sans tracking-wide animate-fade-in">
          {loginError.message || t('auth.loginError', 'Invalid authentication credentials. Please try again.')}
        </div>
      )}

      {/* EMAIL ADDRESS */}
      <div className="relative flex flex-col gap-1 text-start">
        <label
          htmlFor="email"
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
        >
          {t('auth.emailLabel', 'EMAIL ADDRESS')}
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="relative flex flex-col gap-1 text-start">
        <label
          htmlFor="password"
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
        >
          {t('auth.passwordLabel', 'PASSWORD')}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 pe-8 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-inline-end-0 top-1/2 -translate-y-1/2 text-mocha/60 hover:text-espresso p-1 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none text-mocha text-[11px]">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-taupe text-espresso focus:ring-0 cursor-pointer"
          />
          <span>{t('auth.rememberMe', 'Remember Me')}</span>
        </label>
        <a
          href="#forgot"
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-espresso font-medium underline hover:text-walnut transition-colors"
        >
          {t('auth.forgotPassword', 'FORGOT PASSWORD')}
        </a>
      </div>

      {/* SIGN IN BUTTON */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 sm:py-4 bg-espresso text-cream hover:bg-walnut transition-colors duration-300 rounded-full text-xs font-sans font-medium uppercase tracking-[0.25em] flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t('auth.signIn', 'SIGN IN')}
      </button>

      {/* Divider */}
      <div className="relative my-1 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-taupe/40" />
        </div>
        <span className="relative bg-sand px-3 text-[10px] uppercase tracking-[0.2em] text-mocha font-medium">
          OR
        </span>
      </div>

      {/* CONTINUE WITH GOOGLE */}
      <button
        type="button"
        className="w-full py-3 sm:py-3.5 bg-transparent border border-taupe/60 hover:bg-cream/50 transition-colors duration-300 rounded-full text-xs font-sans font-medium uppercase tracking-[0.2em] text-espresso flex items-center justify-center gap-2.5 cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </svg>
        <span>{t('auth.continueWithGoogle', 'CONTINUE WITH GOOGLE')}</span>
      </button>

      {/* Toggle to Register */}
      {onToggleRegister && (
        <div className="pt-2 text-center">
          <p className="text-xs font-sans text-mocha">
            {t('auth.dontHaveAccount', "Don't have an account?")}{' '}
            <button
              type="button"
              onClick={onToggleRegister}
              className="text-espresso font-medium underline hover:text-walnut ms-1 transition-colors cursor-pointer"
            >
              {t('auth.createAccount', 'Create Account')}
            </button>
          </p>
        </div>
      )}
    </form>
  )
}
