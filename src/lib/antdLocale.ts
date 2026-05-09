import ukUA from "antd/locale/uk_UA";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";

const localeMap = {
  en: enUS,
  ua: ukUA,
  ru: ruRU,
} as const;

const getAntdLocale = (locale: string) => {
  return localeMap[locale as keyof typeof localeMap] || enUS;
};

export default getAntdLocale;
