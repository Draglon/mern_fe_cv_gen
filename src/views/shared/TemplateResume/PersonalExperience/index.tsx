"use client";
import { useTranslations } from "next-intl";
import { isEmpty } from "ramda";

import splitText from "@/utils/splitText";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type Experience = {
  map: any;
  position: string;
  startDate: string;
  endDate: string;
  companyName: string;
  placeOfWork: string;
  location: string;
  workingTime: string;
  description: string;
  skills: string[];
};

type PersonalExperienceProps = {
  experience: Experience;
  templateLanguage: string;
};

const PersonalExperience = ({
  experience,
  templateLanguage,
}: PersonalExperienceProps) => {
  const t = useTranslations("Template");

  return (
    <div className="experience">
      {experience.map((item: Experience, index: number) => (
        <div className="experience__item" key={index}>
          <header className="experience__header">
            <div className="experience__header-item">
              <Title className="experience__title" level={3}>
                {item.position}
              </Title>
              <Paragraph className="experience__period" type="secondary" italic>
                {item.startDate} - {item.endDate}
              </Paragraph>
            </div>
            <Paragraph className="experience__company">
              <Text className="experience__company-label" strong>
                {item.companyName}
              </Text>
              <Text type="secondary"> · </Text>
              <Text type="secondary">{item.workingTime}</Text>
            </Paragraph>
            <Paragraph className="experience__place" italic>
              <Text className="experience__place-label">{item.location}</Text>
              <Text type="secondary"> · </Text>
              <Text type="secondary">{item.placeOfWork}</Text>
            </Paragraph>
          </header>
          <Paragraph className="experience__info">
            {splitText(item.description).map((item: string) => (
              <>
                {item}
                <br />
              </>
            ))}
          </Paragraph>
          {!isEmpty(item?.skills) && (
            <div className="skills">
              <Text className="skills__label" strong>
                {t("skills", { locale: templateLanguage })}
              </Text>
              <ul className="skills__list">
                {item.skills.map((skill: string) => (
                  <li className="skills__list-item" key={skill}>
                    <Text className="skills__list-item-text" type="secondary">
                      {skill}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PersonalExperience;
