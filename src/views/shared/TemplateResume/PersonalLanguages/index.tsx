"use client";
import { useTranslations } from "next-intl";

import { Locales } from "@/lib/constants/props/locales";
import { PersonalLanguagesProps } from "@/lib/constants/props/resume";
import { languagesByLocale } from "@/utils/personalLanguages";

import { Text } from "@/views/shared/antd/Typography";

type Language = {
  language: string;
  level: string;
};

type LanguagesProps = {
  templateLanguage: Locales;
  personalLanguages: PersonalLanguagesProps;
};

const PersonalLanguages = ({
  templateLanguage,
  personalLanguages,
}: LanguagesProps) => {
  const t = useTranslations("Template");
  const languages = languagesByLocale(personalLanguages, templateLanguage);

  return (
    <div className="personal-languages">
      <ul className="personal-languages__list">
        {languages.map(({ language, level }: Language) => (
          <li className="personal-languages__item" key={language}>
            <Text className="personal-languages__text section__text" strong>
              {language}
            </Text>
            <Text className="personal-languages__text section__text">
              {t(`personalLanguages.level.${level}`, {
                locale: templateLanguage,
              })}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalLanguages;
