"use client";
import { useLocale, useTranslations } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { educationByLocale } from "@/utils/personalEducation";
import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type PersonalEducationProps = {
  personalEducation: {
    education: Locale;
  };
};

type EducationProps = {
  degree: string;
  institute: string;
  faculty: string;
  specialization: string;
  startDate: string;
  endDate: string;
};

const PersonalEducation = ({ personalEducation }: PersonalEducationProps) => {
  const t = useTranslations("Template");
  const locale = useLocale();
  const education = educationByLocale(personalEducation, locale as Locales);

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
              {t("faculty")}
            </Text>
            <Text className="section__text">{item.faculty}</Text>
          </Paragraph>
          <Paragraph className="section__paragraph">
            <Text className="section__text" strong>
              {t("specialty")}
            </Text>
            <Text className="section__text">{item.specialization}</Text>
          </Paragraph>
        </div>
      ))}
    </>
  );
};

export default PersonalEducation;
