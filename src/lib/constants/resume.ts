import type { ComponentType } from "react";

import PersonalInfoForm from "@/views/shared/PersonalInfo";
import PersonalHobbiesForm from "@/views/shared/PersonalHobbies";
import PersonalLanguagesForm from "@/views/shared/PersonalLanguages";
import PersonalExperienceForm from "@/views/shared/PersonalExperience";
import PersonalEducationForm from "@/views/shared/PersonalEducation";
import PersonalCoursesForm from "@/views/shared/PersonalCourses";
import PersonalSkillsForm from "@/views/shared/PersonalSkills";
import PersonalToolsForm from "@/views/shared/PersonalTools";

export const RESUME_KEYS = [
  "general",
  "hobbies",
  "languages",
  "experience",
  "education",
  "courses",
  "skills",
  "tools",
] as const;

export type ResumeKey = (typeof RESUME_KEYS)[number];

type ResumeItem = {
  key: ResumeKey;
  Component: ComponentType<any>;
};

export const RESUME_ITEMS: ResumeItem[] = [
  { key: "general", Component: PersonalInfoForm },
  { key: "hobbies", Component: PersonalHobbiesForm },
  { key: "languages", Component: PersonalLanguagesForm },
  { key: "experience", Component: PersonalExperienceForm },
  { key: "education", Component: PersonalEducationForm },
  { key: "courses", Component: PersonalCoursesForm },
  { key: "skills", Component: PersonalSkillsForm },
  { key: "tools", Component: PersonalToolsForm },
];

export const DEFAULT_RESUME_ITEM: ResumeKey = "general";
