"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Locales } from "@/lib/constants/props/locales";
import { educationByLocale } from "@/utils/personalEducation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";
import { personalEducationSelector } from "@/store/personalEducation/selectors";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type PersonalEducationProps = {
  templateLanguage: string;
  personalEducationId: string;
};

type EducationProps = {
  degree: string;
  institute: string;
  faculty: string;
  specialization: string;
  startDate: string;
  endDate: string;
};

const PersonalEducation = ({
  personalEducationId,
  templateLanguage,
}: PersonalEducationProps) => {
  const t = useTranslations("Template");
  const dispatch = useAppDispatch();
  const personalEducation = useAppSelector(personalEducationSelector);
  const education = educationByLocale(
    personalEducation,
    templateLanguage as Locales
  );

  useEffect(() => {
    dispatch(fetchPersonalEducation({ id: personalEducationId }));
  }, [dispatch, personalEducationId]);

  return (
    <>
      {education.map((item: EducationProps, index: number) => (
        <div className="section__item" key={index}>
          <header className="section__subheader">
            <Title className="section__subtitle" level={4}>
              {item.degree}
            </Title>
            <Text className="section__period" type="secondary" italic>
              {item.startDate} - {item.endDate}
            </Text>
          </header>
          <Paragraph className="section__paragraph">
            <Text className="section__label" italic>
              {item.institute}
            </Text>
          </Paragraph>
          <Paragraph className="section__paragraph">
            <Text className="section__text" strong>
              {t("faculty", { locale: templateLanguage })}
            </Text>
            <Text className="section__text">{item.faculty}</Text>
          </Paragraph>
          <Paragraph className="section__paragraph">
            <Text className="section__text" strong>
              {t("specialty", { locale: templateLanguage })}
            </Text>
            <Text className="section__text">{item.specialization}</Text>
          </Paragraph>
        </div>
      ))}
    </>
  );
};

export default PersonalEducation;
