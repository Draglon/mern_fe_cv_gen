"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { skillsByLocale } from "@/utils/personalSkills";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";
import { personalSkillsSelector } from "@/store/personalSkills/selectors";

import { Text } from "@/views/shared/antd/Typography";

type PersonalSkillsProps = {
  templateLanguage: string;
  personalSkillsId: string;
};

type SkillItemProps = {
  skill: string;
  level: string | number;
  visible: boolean;
};

const PersonalSkills = ({
  personalSkillsId,
  templateLanguage,
}: PersonalSkillsProps) => {
  const dispatch = useAppDispatch();
  const personalSkills = useAppSelector(personalSkillsSelector);
  const skills = skillsByLocale(personalSkills, templateLanguage as Locales);

  useEffect(() => {
    dispatch(fetchPersonalSkills({ id: personalSkillsId }));
  }, [dispatch, personalSkillsId]);

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
