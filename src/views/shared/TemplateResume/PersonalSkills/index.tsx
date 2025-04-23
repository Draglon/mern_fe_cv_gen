"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { skillsByLocale } from "@/utils/personalSkills";

import { Text } from "@/views/shared/antd/Typography";

type PersonalSkillsProps = {
  personalSkills: {
    skills: Locale;
  };
};

type SkillItemProps = {
  skill: string;
  level: string | number;
  visible: boolean;
};

const PersonalSkills = ({ personalSkills }: PersonalSkillsProps) => {
  const locale = useLocale();
  const skills = skillsByLocale(personalSkills, locale as Locales);

  return (
    <div className="personal-skills">
      {skills.map(({ skill, level, visible }: SkillItemProps, index: number) =>
        visible ? (
          <div className="personal-skills__item" key={index}>
            <Text className="personal-skills__label" strong>
              {skill}
            </Text>
            <div className="personal-skills__progress">
              <div
                className="personal-skills__progress-value"
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default PersonalSkills;
