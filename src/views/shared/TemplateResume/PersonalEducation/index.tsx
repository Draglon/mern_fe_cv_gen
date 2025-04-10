"use client";
import { useLocale, useTranslations } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { Text, Paragraph } from "@/views/shared/antd/Typography";

type PersonalEducationProps = {
  personalEducation: {
    education: Locale;
  };
};

const PersonalEducation = ({ personalEducation }: PersonalEducationProps) => {
  const t = useTranslations("Template");
  const locale = useLocale();
  const educationByLocale = JSON.parse(
    personalEducation?.education[locale as Locales] || "[]"
  );

  console.log("educationByLocale: ", educationByLocale);

  return (
    <div className="section__item">
      {/* <header className="section__subheader">
        <Title className="section__subtitle" level={4}>
          {education.degree}
        </Title>
        <Text className="section__period" type="secondary" italic>
          {education.startDate} - {education.endDate}
        </Text>
      </header> */}
      {/* <Paragraph className="section__paragraph">
        <Text className="section__label" italic>
          {education.place}
        </Text>
      </Paragraph> */}
      <Paragraph className="section__paragraph">
        <Text className="section__text" strong>
          {t("faculty")}
        </Text>
        {/* <Text className="section__text">{education.faculty}</Text> */}
      </Paragraph>
      <Paragraph className="section__paragraph">
        <Text className="section__text" strong>
          {t("specialty")}
        </Text>
        {/* <Text className="section__text">{education.specialty}</Text> */}
      </Paragraph>
    </div>
  );
};

export default PersonalEducation;
