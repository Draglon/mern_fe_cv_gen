"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalSkillsProps } from "@/lib/constants/props/resume";
import { SkillType } from "@/lib/constants/props/resume/personalSkills";
import { skillsByLocale } from "@/utils/personalSkills";

import { Text } from "@/views/shared/antd/Typography";

type SkillsProps = {
  templateLocale: Locales;
  personalSkills: PersonalSkillsProps;
};

const PersonalSkills = ({ templateLocale, personalSkills }: SkillsProps) => {
  const skills = skillsByLocale(personalSkills, templateLocale);

  return (
    <div className="personal-skills">
      {skills.map(({ skill, level, visible }: SkillType, index: number) =>
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
