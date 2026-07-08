import { createContext, useContext, useState, useEffect } from "react";
import zhCN from "./locales/zh-CN";
import zhTW from "./locales/zh-TW";
import en from "./locales/en";

const locales = { "zh-CN": zhCN, "zh-TW": zhTW, en };

function detectLanguage() {
  const lang = navigator.language || navigator.userLanguage || "zh-CN";
  if (lang.startsWith("zh")) {
    return lang.includes("TW") || lang.includes("HK") || lang.includes("MO")
      ? "zh-TW"
      : "zh-CN";
  }
  return "en";
}

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = locales[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

const DOCS_LOCALE_MAP = {
  "zh-CN": "zh-Hans.lproj",
  "zh-TW": "zh-Hant.lproj",
  en: "en.lproj",
};

export function getDocsUrl(locale) {
  const path = DOCS_LOCALE_MAP[locale] || "en.lproj";
  return `https://suhang12332.github.io/Swift-Craft-Launcher-Assets/help/SwiftCraftLauncher.help/Contents/Resources/${path}/`;
}
