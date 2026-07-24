import { useTranslation } from 'react-i18next'

export function ProductTrustIndicators() {
  const { t } = useTranslation()

  const indicators = [
    {
      key: 'secure',
      label: t('product.trust.securePayment'),
      icon: (
        <svg className="w-4 h-4 stroke-current fill-none shrink-0 text-mocha" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      key: 'shipping',
      label: t('product.trust.fastShipping'),
      icon: (
        <svg className="w-4 h-4 stroke-current fill-none shrink-0 text-mocha" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      )
    },
    {
      key: 'returns',
      label: t('product.trust.easyReturns'),
      icon: (
        <svg className="w-4 h-4 stroke-current fill-none shrink-0 text-mocha" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    },
    {
      key: 'support',
      label: t('product.trust.customerSupport'),
      icon: (
        <svg className="w-4 h-4 stroke-current fill-none shrink-0 text-mocha" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      )
    }
  ]

  return (
    <div className="pt-3.5 mt-3.5 border-t border-border2/60 shrink-0">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3">
        {indicators.map((item) => (
          <div key={item.key} className="flex items-center gap-2 text-mocha/85 font-sans">
            {item.icon}
            <span className="text-[10px] sm:text-[11px] leading-snug font-normal tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
