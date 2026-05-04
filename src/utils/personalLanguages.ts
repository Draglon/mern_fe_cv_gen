import { camelCase } from 'lodash';

import { Locales } from "@/lib/constants/props/locales";
import { PersonalLanguagesProps } from "@/lib/constants/props/resume";
import { LanguageType } from "@/lib/constants/props/resume/personalLanguages";

export const languagesByLocale = (personalLanguages: PersonalLanguagesProps, locale: Locales) =>
  personalLanguages?.languages?.[locale]
  ? personalLanguages.languages[locale].map((item: LanguageType) => ({
      language: item.language,
      level: camelCase(item.level),
    }))
  : [];
