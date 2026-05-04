import { Locales, Locale } from "@/lib/constants/props/locales";
import { CourseType } from "@/lib/constants/props/resume/personalCourses";
import { EducationType } from "@/lib/constants/props/resume/personalEducation";
import { ExperienceType } from "@/lib/constants/props/resume/personalExperiences";
import { HobbyType } from "@/lib/constants/props/resume/personalHobbies";
import { LanguageType } from "@/lib/constants/props/resume/personalLanguages";
import { SkillType } from "@/lib/constants/props/resume/personalSkills";
import { ToolType } from "@/lib/constants/props/resume/personalTools";

export type TemplateProps = {
  template: string;
  templateLocale: Locales;
};

export type PersonalInfoProps = {
  sectionTitle?: Locale;
  userUrl?: Locale,
  firstName: Locale,
  lastName: Locale,
  email: Locale,
  aboutMe: Locale,
  address: Locale,
  phoneNumber: Locale,
  birthday: Locale,
  linkedIn?: Locale,
  telegram?: Locale,
  portfolio?: Locale,
};

export type PersonalHobbiesProps = {
  sectionTitle?: Locale;
  hobbies: {
    en: HobbyType[];
    ua: HobbyType[];
    ru: HobbyType[];
  };
};

export type PersonalLanguagesProps = {
  sectionTitle?: Locale;
  languages: {
    en: LanguageType[];
    ua: LanguageType[];
    ru: LanguageType[];
  };
};

export type PersonalExperienceProps = {
  sectionTitle?: Locale;
  recentPositionsCount?: number | string;
  experiences: {
    en: ExperienceType[];
    ua: ExperienceType[];
    ru: ExperienceType[];
  };
};

export type PersonalEducationProps = {
  sectionTitle?: Locale;
  education: {
    en: EducationType[];
    ua: EducationType[];
    ru: EducationType[];
  };
};

export type PersonalCoursesProps = {
  sectionTitle?: Locale;
  courses: {
    en: CourseType[];
    ua: CourseType[];
    ru: CourseType[];
  }
};

export type PersonalSkillsProps = {
  sectionTitle?: Locale;
  skills: {
    en: SkillType[];
    ua: SkillType[];
    ru: SkillType[];
  };
};

export type PersonalToolsProps = {
  sectionTitle?: Locale;
  tools: {
    en?: ToolType[];
    ua?: ToolType[];
    ru?: ToolType[];
  };
};

export type ResumeProps = {
  personalInfo: PersonalInfoProps;
  personalHobbies: PersonalHobbiesProps;
  personalLanguages: PersonalLanguagesProps;
  personalExperience: PersonalExperienceProps;
  personalEducation: PersonalEducationProps;
  personalCourses: PersonalCoursesProps;
  personalSkills: PersonalSkillsProps;
  personalTools: PersonalToolsProps;
}
