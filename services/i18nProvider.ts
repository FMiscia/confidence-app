import it from './messages/it'
import en from './messages/en'

export type AppStringsType = typeof en
export type Appi18n = (locale: string) => AppStringsType

const i18nProvider = () => {
    const t = (locale: string) => {
        switch (locale) {
            case 'it':
                return it
            case 'en':
                return en
            default:
                return en
        }
    }
    return t
}

export default i18nProvider
