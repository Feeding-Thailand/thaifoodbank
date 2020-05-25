import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../locales/en/translations.json'
import th from '../../locales/th/translations.json'
const resources = {
    en: {
        translation: en
    },
    th: {
        translation: th
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    fallbackLng: 'th',
    debug: true,
    interpolation: {
        escapeValue: false
    },
    react: {
        wait: true
    }
})

export default i18n