import { useTranslations } from "next-intl";
import { equals, pathOr } from "ramda";

import { TEMPLATES } from "@/lib/constants/templates";
import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";

import isPresent from "@/utils/isPresent";
import getSectionTitle from "@/utils/getSectionTitle";
import { experienceByLocale } from "@/utils/personalExperience";

const useResumeTemplateContent = ({ template, templateLocale, resume }: TemplateProps & { resume: ResumeProps }) => {
  const t = useTranslations("Template");
  const locale = templateLocale;
  const personalInfoTitle = t("personalInfo.title", { locale });
  const experienceTitle = t("personalExperience.title", { locale });
  const educationTitle = t("personalEducation.title", { locale });
  const coursesTitle = t("personalCourses.title", { locale });
  const skillsTitle = t("personalSkills.title", { locale });
  const toolsTitle = t("personalTools.title", { locale });

  const experiences = experienceByLocale(resume?.personalExperience, locale);
  const recentPositionsCount = pathOr(
    undefined,
    ["recentPositionsCount"],
    resume?.personalExperience
  );
  const formattedExperience = experiences.slice(
    0,
    recentPositionsCount || experiences.length
  );

  const personalExperienceTitle = getSectionTitle({
    data: resume?.personalExperience,
    locale,
    defaultTitle: experienceTitle,
  });
  const personalExperienceText = recentPositionsCount
    ? t("personalExperience.text", {
        locale,
        number: recentPositionsCount,
      })
    : undefined;
  const personalEducationTitle = getSectionTitle({
    data: resume?.personalEducation,
    locale,
    defaultTitle: educationTitle,
  });
  const personalCoursesTitle = getSectionTitle({
    data: resume?.personalCourses,
    locale,
    defaultTitle: coursesTitle,
  });
  const personalSkillsTitle = getSectionTitle({
    data: resume?.personalSkills,
    locale,
    defaultTitle: skillsTitle,
  });
  const personalToolsTitle = getSectionTitle({
    data: resume?.personalTools,
    locale,
    defaultTitle: toolsTitle,
  });

  return {
    personalInfoTitle,
    personalExperienceTitle,
    personalExperienceText,
    formattedExperience,
    personalEducationTitle,
    personalCoursesTitle,
    personalSkillsTitle,
    personalToolsTitle,

    isPersonalInfo: isPresent(resume?.personalInfo),
    isPersonalExperience: isPresent(resume?.personalExperience),
    isPersonalEducation: isPresent(resume?.personalEducation),
    isPersonalCourses: isPresent(resume?.personalCourses),
    isPersonalSkills: isPresent(resume?.personalSkills) && !equals(template, TEMPLATES.edinburghPlus),
    isPersonalTools: isPresent(resume?.personalTools) && !equals(template, TEMPLATES.edinburghPlus),
  }
}

export default useResumeTemplateContent
