"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Locales } from "@/lib/constants/props/locales";
import { languagesByLocale } from "@/utils/personalLanguages";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";
import { personalLanguagesSelector } from "@/store/personalLanguages/selectors";

import { Text } from "@/views/shared/antd/Typography";

type Language = {
  language: string;
  level: string;
};

type LanguagesProps = {
  templateLanguage: string;
  personalLanguagesId: string;
};

const PersonalLanguages = ({
  personalLanguagesId,
  templateLanguage,
}: LanguagesProps) => {
  const t = useTranslations("Template");
  const dispatch = useAppDispatch();
  const personalLanguages = useAppSelector(personalLanguagesSelector);
  const languages = languagesByLocale(
    personalLanguages,
    templateLanguage as Locales
  );

  useEffect(() => {
    dispatch(fetchPersonalLanguages({ id: personalLanguagesId }));
  }, [dispatch, personalLanguagesId]);

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
