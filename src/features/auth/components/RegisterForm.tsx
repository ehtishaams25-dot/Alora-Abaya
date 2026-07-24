import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRegister } from '../hooks/useAuth'

interface RegisterFormProps {
  onSuccess?: () => void
  onToggleLogin?: () => void
}

export function RegisterForm({ onSuccess, onToggleLogin }: RegisterFormProps) {
  const { t } = useTranslation()
  const { mutate: register, isPending, error: registerError } = useRegister()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password || !firstName || !lastName) return

    register(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
      },
      {
        onSuccess: () => {
          onSuccess?.()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full shrink-0">
      {registerError && (
        <div className="p-3 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs font-sans tracking-wide animate-fade-in">
          {registerError.message || t('auth.registerError', 'Failed to create account. Please check your information.')}
        </div>
      )}

      {/* FULL NAME */}
      <div className="grid grid-cols-2 gap-4 text-start">
        <div className="relative flex flex-col gap-1">
          <label
            htmlFor="firstName"
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
          >
            {t('auth.firstNameLabel', 'FIRST NAME')}
          </label>
          <div className="relative">
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Fatima"
              className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
            />
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
          </div>
        </div>

        <div className="relative flex flex-col gap-1">
          <label
            htmlFor="lastName"
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
          >
            {t('auth.lastNameLabel', 'LAST NAME')}
          </label>
          <div className="relative">
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Al-Zahra"
              className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
            />
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
          </div>
        </div>
      </div>

      {/* EMAIL ADDRESS */}
      <div className="relative flex flex-col gap-1 text-start">
        <label
          htmlFor="regEmail"
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
        >
          {t('auth.emailLabel', 'EMAIL ADDRESS')}
        </label>
        <div className="relative">
          <input
            id="regEmail"
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

      {/* PHONE NUMBER */}
      <div className="relative flex flex-col gap-1 text-start">
        <label
          htmlFor="phone"
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
        >
          {t('auth.phoneLabel', 'PHONE NUMBER (OPTIONAL)')}
        </label>
        <div className="relative">
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+966 50 000 0000"
            className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="relative flex flex-col gap-1 text-start">
        <label
          htmlFor="regPassword"
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
        >
          {t('auth.passwordLabel', 'PASSWORD')}
        </label>
        <div className="relative">
          <input
            id="regPassword"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
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

      {/* CREATE ACCOUNT BUTTON */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 sm:py-4 bg-espresso text-cream hover:bg-walnut transition-colors duration-300 rounded-full text-xs font-sans font-medium uppercase tracking-[0.25em] flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer mt-2"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t('auth.createAccount', 'CREATE ACCOUNT')}
      </button>

      {/* Toggle to Login */}
      {onToggleLogin && (
        <div className="pt-2 text-center">
          <p className="text-xs font-sans text-mocha">
            {t('auth.alreadyHaveAccount', 'Already have an account?')}{' '}
            <button
              type="button"
              onClick={onToggleLogin}
              className="text-espresso font-medium underline hover:text-walnut ms-1 transition-colors cursor-pointer"
            >
              {t('auth.signIn', 'Sign In')}
            </button>
          </p>
        </div>
      )}
    </form>
  )
}
