import * as Locales from "date-fns/locale";
import { Locale } from "date-fns";

interface LocalesMap {
  [key: string]: Locale;
}

const convertToCodes = (
  locale = "",
): { localeCode: string; languageCode: string } => {
  const [langCode, localCode] = locale.split("-");

  return {
    localeCode: localCode ? `${langCode}${localCode.toUpperCase()}` : langCode,
    languageCode: langCode,
  };
};

export const getDateLocale = (locale: string): Locale => {
  const { localeCode, languageCode } = convertToCodes(locale);

  const locales: LocalesMap = Locales;

  return locales[localeCode] ?? locales[languageCode] ?? Locales.enGB;
};
