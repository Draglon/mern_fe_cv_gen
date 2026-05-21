export type Locales = "en" | "ua" | "ru";

export type Locale = {
  en?: string;
  ua?: string;
  ru?: string;
}

export type WithLocale<T> = T & {
  locale: string;
};
