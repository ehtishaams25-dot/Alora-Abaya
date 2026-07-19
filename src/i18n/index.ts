import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { resources } from './resources'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'translation',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

// Set initial direction and language on document
const updateDocumentDirection = (lng: string) => {
  const dir = i18n.dir(lng)
  document.documentElement.dir = dir
  document.documentElement.lang = lng
}

updateDocumentDirection(i18n.language)

i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng)
})

export default i18n
