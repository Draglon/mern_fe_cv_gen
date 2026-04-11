"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalSkillsProps } from "@/lib/constants/props/resume";
import { skillsByLocale } from "@/utils/personalSkills";

import { Text } from "@/views/shared/antd/Typography";

type SkillItemProps = {
  skill: string;
  level: string | number;
  visible: boolean;
};

type SkillsProps = {
  templateLanguage: Locales;
  personalSkills: PersonalSkillsProps;
};

const PersonalSkills = ({ templateLanguage, personalSkills }: SkillsProps) => {
  const skills = skillsByLocale(personalSkills, templateLanguage);

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
