"use client";
import { path } from "ramda";

import { TEMPLATES_TRANSLATIONS } from "@/lib/constants/templates";
import { Locale, Locales } from "@/lib/constants/props/locales";
import { educationByLocale } from "@/utils/personalEducation";
import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type PersonalEducationProps = {
  templateLanguage: string;
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

const PersonalEducation = ({
  personalEducation,
  templateLanguage,
}: PersonalEducationProps) => {
  const education = educationByLocale(
    personalEducation,
    templateLanguage as Locales
  );

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
              {path([templateLanguage, "faculty"], TEMPLATES_TRANSLATIONS)}
            </Text>
            <Text className="section__text">{item.faculty}</Text>
          </Paragraph>
          <Paragraph className="section__paragraph">
            <Text className="section__text" strong>
              {path([templateLanguage, "specialty"], TEMPLATES_TRANSLATIONS)}
            </Text>
            <Text className="section__text">{item.specialization}</Text>
          </Paragraph>
        </div>
      ))}
    </>
  );
};

export default PersonalEducation;
