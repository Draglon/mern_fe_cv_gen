"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { isEmpty } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import splitText from "@/utils/splitText";
import { experienceByLocale } from "@/utils/personalExperience";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import { personalExperienceSelector } from "@/store/personalExperience/selectors";

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
  personalExperienceId: string;
};

const PersonalExperience = ({
  personalExperienceId,
  templateLanguage,
}: ExperiencesProps) => {
  const t = useTranslations("Template");
  const dispatch = useAppDispatch();
  const personalExperience = useAppSelector(personalExperienceSelector);
  const experience = experienceByLocale(
    personalExperience,
    templateLanguage as Locales
  );

  useEffect(() => {
    dispatch(fetchPersonalExperience({ id: personalExperienceId }));
  }, [dispatch, personalExperienceId]);

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
