import ruFlag from "@/assets/images/locale/RU.svg";
import uaFlag from "@/assets/images/locale/UA.svg";
import ukFlag from "@/assets/images/locale/UK.svg";

import type { Country } from "react-phone-number-input";

export const LOCALES = ["en", "ua", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const FLAGS: Record<Locale, string> = {
  ru: ruFlag,
  ua: uaFlag,
  en: ukFlag,
};

export const DEFAULT_PHONE_NUMBER_LOCALE: Country = "US";
