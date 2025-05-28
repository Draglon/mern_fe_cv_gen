"use client";
import { isEmpty, path } from "ramda";

import { TEMPLATES_TRANSLATIONS } from "@/lib/constants/templates";
import splitText from "@/utils/splitText";
import { Locale, Locales } from "@/lib/constants/props/locales";
import { experienceByLocale } from "@/utils/personalExperience";

import { Title, Text, Paragraph } from "@/views/shared/antd/Typography";

type Experience = {
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

type ExperiencesProps = {
  templateLanguage: string;
  personalExperience: {
    experience: Locale;
  };
};

const PersonalExperience = ({
  personalExperience,
  templateLanguage,
}: ExperiencesProps) => {
  const experience = experienceByLocale(
    personalExperience,
    templateLanguage as Locales
  );

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
              <Text strong>{item.companyName}</Text>
              <Text> · </Text>
              <Text type="secondary">{item.workingTime}</Text>
            </Paragraph>
            <Paragraph className="experience__place" italic>
              <Text>{item.location}</Text>
              <Text> · </Text>
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
                {path([templateLanguage, "skills"], TEMPLATES_TRANSLATIONS)}
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
