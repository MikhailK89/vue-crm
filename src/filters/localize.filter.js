import store from '@/store'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter(key, locale = null) {
  if (!locale) {
    if (store.getters.info.locale) {
      locale = store.getters.info.locale
    } else if (typeof JSON.parse(localStorage.getItem('locale')) === 'boolean') {
      locale = JSON.parse(localStorage.getItem('locale')) ? 'ru-RU' : 'en-US'
    } else {
      locale = 'ru-RU'
    }
  }
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
