"use client";
import { useTranslations } from "next-intl";

import { Locales } from "@/lib/constants/props/locales";
import { PersonalEducationProps } from "@/lib/constants/props/resume";
import { EducationType } from "@/lib/constants/props/resume/personalEducation";
import { formatDateRange } from "@/utils/dateTime";
import { educationByLocale } from "@/utils/personalEducation";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type EducationsProps = {
  templateLocale: Locales;
  personalEducation: PersonalEducationProps;
};

const PersonalEducation = ({
  templateLocale,
  personalEducation,
}: EducationsProps) => {
  const t = useTranslations("Template");
  const education = educationByLocale(personalEducation, templateLocale);

  return (
    <>
      {education.map((item: EducationType, index: number) => (
        <div className="section__item" key={index}>
          <header className="section__subheader">
            <Title className="section__subtitle" level={4}>
              {item.degree}
            </Title>
            <Text className="section__period" type="secondary" italic>
              {formatDateRange({
                ...item,
                locale: templateLocale,
                tCurrentTime: t(
                  `personalEducation.currentTime.${templateLocale}`
                ),
              })}
            </Text>
          </header>
          <Paragraph className="section__paragraph">
            <Text className="section__label" italic>
              {item.institute}
            </Text>
          </Paragraph>
          {item?.faculty && (
            <Paragraph className="section__paragraph">
              <Text className="section__text" strong>
                {t(`faculty.${templateLocale}`)}
              </Text>
              <Text className="section__text">{item.faculty}</Text>
            </Paragraph>
          )}
          {item?.specialization && (
            <Paragraph className="section__paragraph">
              <Text className="section__text" strong>
                {t(`specialty.${templateLocale}`)}
              </Text>
              <Text className="section__text">{item.specialization}</Text>
            </Paragraph>
          )}
        </div>
      ))}
    </>
  );
};

export default PersonalEducation;
