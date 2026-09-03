import { Locales } from "@/lib/constants/props/locales";
import { PersonalToolsProps } from "@/lib/constants/props/resume";

export const toolsByLocale = (locale: Locales, personalTools?: PersonalToolsProps) =>
  personalTools?.tools[locale] || [];
