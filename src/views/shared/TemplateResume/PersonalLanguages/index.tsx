"use client";
import { useLocale, useTranslations } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { Text } from "@/views/shared/antd/Typography";

type Language = {
  language: string;
  level: string;
};

type Languages = {
  languages: {
    languages: Locale;
  };
};

const PersonalLanguages = ({ languages }: Languages) => {
  const locale = useLocale();
  const t = useTranslations("Template.personalLanguages");
  const languagesByLocale = JSON.parse(
    languages?.languages[locale as Locales] || "[]"
  );

  return (
    <div className="personal-languages">
      <ul className="personal-languages__list">
        {languagesByLocale.map(({ language, level }: Language) => (
          <li className="personal-languages__item" key={language}>
            <Text className="personal-languages__text section__text" strong>
              {language}
            </Text>
            <Text className="personal-languages__text section__text">
              {t(`level.${level}`)}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalLanguages;
