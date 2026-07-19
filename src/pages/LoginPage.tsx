import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigation } from '../components/Navigation'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function LoginPage() {
  const { t } = useTranslation()
  useDocumentTitle('Layali | Account Authentication ليالي')

  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Simulate quiet luxury authentication state feedback
    setTimeout(() => {
      setSubmitted(false)
    }, 2500)
  }

  return (
    <div className="h-screen max-h-screen bg-sand text-espresso font-sans flex flex-col overflow-x-hidden md:overflow-hidden selection:bg-taupe/20 selection:text-espresso">
      {/* Exact existing sticky navigation bar (shrink-0 ensures it never squishes) */}
      <div className="shrink-0">
        <Navigation hideAnnouncement={true} />
      </div>

      {/* Main Split Layout: Desktop 50/50, Tablet 40/60. Takes exact remaining viewport height (`flex-1 min-h-0`) */}
      <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-y-auto md:overflow-hidden">
        
        {/* Left Column: Full-height luxury editorial campaign image (Hidden on mobile, 50% on desktop, 40% on tablet) */}
        <section className="hidden md:flex md:col-span-5 lg:col-span-6 relative overflow-hidden group md:min-h-0 md:h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
          {/* Background Editorial Photography */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=1600&q=90"
              alt={t('auth.imageTitle', 'Timeless Elegance')}
              className="w-full h-full object-cover object-top sm:object-center transition-transform duration-[3000ms] ease-out group-hover:scale-105 animate-scale-in"
            />
            {/* Subtle warm neutral & espresso gradient overlay tailored for luxury visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent mix-blend-normal" />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-taupe/10 mix-blend-overlay" />
          </div>

          {/* Bottom-left Editorial Typography Overlay */}
          <div className="relative z-10 max-w-lg animate-fade-up">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cream font-normal tracking-tight leading-[1.08] drop-shadow-sm">
              {t('auth.imageTitle', 'Timeless Elegance')}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-cream/85 tracking-wide mt-2 sm:mt-2.5 leading-relaxed max-w-md">
              {t('auth.imageSubtitle', 'Crafted for women who appreciate understated luxury.')}
            </p>
          </div>
        </section>

        {/* Right Column: Centered Authentication Card & Minimal Footer (`h-full min-h-0`) */}
        <section className="md:col-span-7 lg:col-span-6 h-full min-h-0 flex flex-col justify-between bg-sand overflow-y-auto md:overflow-hidden">
          
          {/* Centered Auth Container engineered with refined ergonomics for 0px vertical scrolling */}
          <div className="w-full max-w-[420px] sm:max-w-[440px] mx-auto px-6 sm:px-8 my-auto py-4 sm:py-6 flex flex-col justify-center animate-fade-up min-h-0">
            
            {/* Card Header (compact margins for zero scroll while keeping luxury breathing room) */}
            <header className="mb-6 sm:mb-7 text-start shrink-0">
              <span className="text-eyebrow block mb-1.5 font-medium">
                {t('auth.eyebrow', 'ACCOUNT')}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso tracking-tight font-normal leading-tight">
                {isRegister ? t('auth.createAccountTitle', 'Create Account') : t('auth.title', 'Welcome Back')}
              </h1>
              <p className="text-[13px] text-mocha mt-1.5 leading-relaxed">
                {isRegister
                  ? t('auth.createAccountSubtitle', 'Join our private circle for bespoke drops and atelier orders.')
                  : t('auth.subtitle', 'Sign in to access your orders, wishlist, and exclusive collections.')}
              </p>
            </header>

            {/* Simulated success notice on submit */}
            {submitted && (
              <div className="mb-4 p-3 rounded-xl bg-success/10 border border-success/30 text-success text-xs font-medium tracking-wide animate-fade-up flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse shrink-0" />
                <span>
                  {isRegister
                    ? 'Account application received. Welcome to the Alora Circle.'
                    : 'Authentication successful. Redirecting to your private atelier dashboard...'}
                </span>
              </div>
            )}

            {/* Authentication Form with optimized touch targets and vertical rhythm */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 shrink-0">
              
              {/* Full Name field (Register only) */}
              {isRegister && (
                <div className="relative flex flex-col gap-1 animate-fade-up">
                  <label
                    htmlFor="fullName"
                    className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
                  >
                    {t('auth.nameLabel', 'Full Name')}
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      required={isRegister}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t('auth.namePlaceholder', 'Enter your full name')}
                      className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                    />
                    {/* Animated bottom border focus highlight */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
                  </div>
                </div>
              )}

              {/* Email Address Input */}
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
                >
                  {t('auth.emailLabel', 'Email Address')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder', 'name@example.com')}
                    className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                  />
                  {/* Animated focus underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
                </div>
              </div>

              {/* Password Input with Eye Toggle */}
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-espresso font-medium font-sans select-none"
                >
                  {t('auth.passwordLabel', 'Password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder', 'Enter your password')}
                    className="peer bg-transparent border-0 border-b border-taupe py-2 sm:py-2.5 pe-10 rtl:pe-0 rtl:ps-10 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                  />
                  {/* Animated focus underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-espresso scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
                  
                  {/* Password Eye Toggle Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-0 bottom-1.5 text-mocha hover:text-espresso transition-colors p-1 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide' : 'Show'}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox & Forgot Password Right Aligned */}
              {!isRegister && (
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 text-mocha cursor-pointer hover:text-espresso transition-colors select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 accent-espresso rounded border-border2 cursor-pointer transition-transform duration-200 checked:scale-105"
                    />
                    <span>{t('auth.rememberMe', 'Remember Me')}</span>
                  </label>

                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Private reset instruction sent to your email if registered.')
                    }}
                    className="text-[11px] uppercase tracking-wider text-espresso hover:text-walnut transition-colors underline underline-offset-4 font-medium"
                  >
                    {t('auth.forgotPassword', 'Forgot Password')}
                  </a>
                </div>
              )}

              {/* Primary Button (Full width, rounded pill, dark espresso, slight lift) */}
              <div className="pt-1.5 sm:pt-2">
                <button
                  type="submit"
                  className="w-full bg-espresso text-cream rounded-full py-3 sm:py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 hover:shadow-lg transition-all duration-500 cursor-pointer min-h-[44px] flex items-center justify-center"
                >
                  {isRegister ? t('auth.registerButton', 'Create Account') : t('auth.signIn', 'Sign In')}
                </button>
              </div>
            </form>

            {/* Divider Line with Centered Text */}
            <div className="relative my-4 sm:my-5 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border2" />
              </div>
              <span className="relative z-10 bg-sand px-3 text-[10px] uppercase tracking-[0.25em] text-mocha/80 font-sans font-medium">
                {t('auth.or', 'OR')}
              </span>
            </div>

            {/* Secondary Button: Continue with Google (Rounded outline, minimal icon) */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => alert('Redirecting to Google VIP OAuth portal...')}
                className="w-full rounded-full border border-border2 bg-transparent hover:bg-cream hover:border-espresso text-espresso py-3 sm:py-3.5 px-6 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans transition-all duration-500 cursor-pointer min-h-[44px] flex items-center justify-center gap-2.5 hover:-translate-y-0.5 hover:shadow-sm group"
              >
                {/* Minimalist Monochrome Google Icon */}
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110 shrink-0" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span>{t('auth.continueWithGoogle', 'Continue with Google')}</span>
              </button>
            </div>

            {/* Bottom Text: Don't have an account? Create Account */}
            <div className="mt-4 sm:mt-5 text-center text-xs text-mocha font-sans shrink-0">
              <span>
                {isRegister
                  ? t('auth.hasAccount', 'Already have an account?')
                  : t('auth.noAccount', "Don't have an account?")}
              </span>
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault()
                  setIsRegister(!isRegister)
                }}
                className="ms-1.5 font-medium text-espresso underline underline-offset-4 hover:text-walnut transition-colors inline-block py-1"
              >
                {isRegister ? t('auth.signIn', 'Sign In') : t('auth.createAccount', 'Create Account')}
              </a>
            </div>

          </div>

          {/* Sleek Zero-Scroll Minimal Footer: Privacy Policy | Terms | Returns | Contact */}
          <footer className="w-full border-t border-border2/80 bg-sand/80 py-3 sm:py-3.5 px-6 sm:px-10 shrink-0">
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-mocha font-sans text-[11px]">
              
              {/* Minimalist Legal & Support Links */}
              <nav className="flex items-center justify-center flex-wrap gap-5 sm:gap-7 uppercase tracking-[0.18em] font-medium">
                <a href="#privacy" className="hover:text-espresso transition-colors">
                  {t('auth.privacyPolicy', 'Privacy Policy')}
                </a>
                <a href="#terms" className="hover:text-espresso transition-colors">
                  {t('auth.terms', 'Terms')}
                </a>
                <a href="#returns" className="hover:text-espresso transition-colors">
                  {t('auth.returns', 'Returns')}
                </a>
                <a href="#contact" className="hover:text-espresso transition-colors">
                  {t('auth.contact', 'Contact')}
                </a>
              </nav>

              {/* Minimal Copyright & Atelier Signature */}
              <div className="flex items-center gap-2 sm:gap-3 text-mocha/80 text-[11px]">
                <span>© 2026 Alora</span>
                <span>•</span>
                <span className="tracking-wider uppercase text-espresso font-medium">Atelier Riyadh</span>
              </div>
            </div>
          </footer>

        </section>

      </main>
    </div>
  )
}
