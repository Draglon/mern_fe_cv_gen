"use client";
import { useTranslations } from "next-intl";

import { Locales, Locale } from "@/lib/constants/props/locales";
import { educationByLocale } from "@/utils/personalEducation";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type EducationProps = {
  degree: string;
  institute: string;
  faculty: string;
  specialization: string;
  startDate: string;
  endDate: string;
};

type PersonalEducationProps = {
  templateLanguage: Locales;
  personalEducation: {
    education: Locale;
  };
};

const PersonalEducation = ({
  templateLanguage,
  personalEducation,
}: PersonalEducationProps) => {
  const t = useTranslations("Template");
  const education = educationByLocale(personalEducation, templateLanguage);

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
