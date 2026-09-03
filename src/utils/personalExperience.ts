import { camelCase } from 'lodash';

import { Locales } from "@/lib/constants/props/locales";
import { PersonalExperienceProps } from "@/lib/constants/props/resume";
import { ExperienceType, EmploymentType, WorkFormat } from "@/lib/constants/props/resume/personalExperiences";

export const experienceByLocale = (locale: Locales, personalExperience?: PersonalExperienceProps) =>
  personalExperience?.experiences?.[locale]
  ? personalExperience.experiences[locale].map((item: ExperienceType) => ({
      ...item,
      employmentType: camelCase(item.employmentType) as EmploymentType,
      workFormat: camelCase(item.workFormat) as WorkFormat,
    }))
  : [];
