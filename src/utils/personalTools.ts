import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalToolsProps = {
  tools: Locale;
};

export const toolsByLocale = (personalTools: PersonalToolsProps, locale: Locales) => JSON.parse(
  personalTools?.tools[locale as Locales] || "[]"
);
