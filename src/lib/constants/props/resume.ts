import { Locales, Locale } from "@/lib/constants/props/locales";

export type TemplateProps = {
  template: string;
  templateLanguage: Locales;
};

export type PersonalInfoProps = {
  sectionTitle?: Locale;
  userUrl?: string,
  firstName: Locale,
  lastName: Locale,
  email: Locale,
  about: Locale,
  address: Locale,
  phoneNumber: Locale,
  birthday: Locale,
  linkedIn?: Locale,
  telegram?: Locale,
  portfolio?: Locale,
};

export type PersonalHobbiesProps = {
  sectionTitle?: Locale;
  hobbies: Locale;
};

export type PersonalLanguagesProps = {
  sectionTitle?: Locale;
  languages: Locale;
};

export type PersonalExperienceProps = {
  sectionTitle?: Locale;
  lastPlacesOfWorks?: number | string;
  experience: Locale;
};

export type PersonalEducationProps = {
  sectionTitle?: Locale;
  education: Locale;
};

export type PersonalCoursesProps = {
  sectionTitle?: Locale;
  courses: Locale;
};

export type PersonalSkillsProps = {
  sectionTitle?: Locale;
  skills: Locale;
};

export type PersonalToolsProps = {
  sectionTitle?: Locale;
  tools: Locale;
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
