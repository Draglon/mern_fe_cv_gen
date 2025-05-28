"use client";
import { path } from "ramda";

import { TEMPLATES_TRANSLATIONS } from "@/lib/constants/templates";
import { Locale, Locales } from "@/lib/constants/props/locales";
import { languagesByLocale } from "@/utils/personalLanguages";

import { Text } from "@/views/shared/antd/Typography";

type Language = {
  language: string;
  level: string;
};

type LanguagesProps = {
  templateLanguage: string;
  personalLanguages: {
    languages: Locale;
  };
};

const PersonalLanguages = ({
  personalLanguages,
  templateLanguage,
}: LanguagesProps) => {
  const languages = languagesByLocale(
    personalLanguages,
    templateLanguage as Locales
  );

  return (
    <div className="personal-languages">
      <ul className="personal-languages__list">
        {languages.map(({ language, level }: Language) => (
          <li className="personal-languages__item" key={language}>
            <Text className="personal-languages__text section__text" strong>
              {language}
            </Text>
            <Text className="personal-languages__text section__text">
              {path(
                [templateLanguage, "personalLanguages", "level", level],
                TEMPLATES_TRANSLATIONS
              )}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalLanguages;
