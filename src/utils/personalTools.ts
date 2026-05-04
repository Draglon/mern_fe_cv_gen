import { Locales } from "@/lib/constants/props/locales";
import { PersonalToolsProps } from "@/lib/constants/props/resume";

export const toolsByLocale = (personalTools: PersonalToolsProps, locale: Locales) =>
  personalTools?.tools[locale] || [];
