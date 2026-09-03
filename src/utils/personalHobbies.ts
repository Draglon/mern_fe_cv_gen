import { Locales } from "@/lib/constants/props/locales";
import { PersonalHobbiesProps } from "@/lib/constants/props/resume";

export const hobbiesByLocale = ( locale: Locales, personalHobbies?: PersonalHobbiesProps) => 
  personalHobbies?.hobbies[locale] || []
;
