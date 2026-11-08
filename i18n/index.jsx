import { createContext, useContext, useEffect, useState } from 'react';
import en from './locales/en';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';

const locales = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};

const normalizeLocale = (language) => {
  if (!language) return 'en';

  const lang = language.toLowerCase();

  if (lang.startsWith('zh')) {
    if (
      lang.includes('tw') ||
      lang.includes('hk') ||
      lang.includes('mo') ||
      lang.includes('hant')
    ) {
      return 'zh-TW';
    }

    return 'zh-CN';
  }

  // Unsupported system languages fall back to English.
  return 'en';
};

const detectLocale = () => {
  if (typeof navigator === 'undefined') return 'en';

  return normalizeLocale(navigator.language || navigator.userLanguage);
};

const I18nContext = createContext({ t: en });

export function I18nProvider({ children }) {
  // Always render English first so server and client markup match, then follow
  // the system language after mounting.
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const nextLocale = detectLocale();

    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  return (
    <I18nContext.Provider value={{ t: locales[locale] || en }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
