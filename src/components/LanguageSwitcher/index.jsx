import React from "react";
import { useI18n } from "../../i18n";

const LANGUAGES = [
  { code: "zh-CN", label: "简体" },
  { code: "zh-TW", label: "繁體" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="lang-debug">
      <select
        className="lang-debug-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
