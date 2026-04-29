import { useTranslations } from "next-intl";
import { includes } from "ramda";

import {
  TEMPLATES_PERSONAL_INFO_FULLNAME,
  TEMPLATES_SIDEBARS_SKILLS,
  TEMPLATES_SIDEBARS_TOOLS,
} from "@/lib/constants/templates";
import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";

import isPresent from "@/utils/isPresent";
import getSectionTitle from "@/utils/getSectionTitle";

const useResumeTemplateSidebar = ({ template, templateLocale, resume }: TemplateProps & { resume: ResumeProps }) => {
  const t = useTranslations("Template");
  const locale = templateLocale;
  const infoTitle = t("personalData.title", { locale });
  const hobbiesTitle = t("personalHobbies.title", { locale });
  const languagesTitle = t("personalLanguages.title", { locale });
  const skillsTitle = t("personalSkills.title", { locale });
  const toolsTitle = t("personalTools.title", { locale });
  const personalPhotoAlt = t("personalPhoto.alt", { locale })

  const personalPhoto = resume?.personalInfo?.userUrl?.[locale];
  const personalInfoTitle = getSectionTitle({
    data: resume?.personalInfo,
    locale,
    defaultTitle: infoTitle,
  });
  const personalHobbiesTitle = getSectionTitle({
    data: resume?.personalHobbies,
    locale,
    defaultTitle: hobbiesTitle,
  });
  const personalLanguagesTitle = getSectionTitle({
    data: resume?.personalLanguages,
    locale,
    defaultTitle: languagesTitle,
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

  const isPersonalPhoto = isPresent(personalPhoto);
  const isPersonalFullName =
    isPresent(resume?.personalInfo) &&
    includes(template, TEMPLATES_PERSONAL_INFO_FULLNAME);
  const isPersonalInfo = isPresent(resume?.personalInfo);
  const isPersonalHobbies = isPresent(resume?.personalHobbies);
  const isPersonalLanguages = isPresent(resume?.personalLanguages);
  const isPersonalSkills =
    isPresent(resume?.personalSkills) &&
    includes(template, TEMPLATES_SIDEBARS_SKILLS);
  const isPersonalTools =
    isPresent(resume?.personalTools) &&
    includes(template, TEMPLATES_SIDEBARS_TOOLS);

  return {
    personalPhoto,
    personalPhotoAlt,
    personalInfoTitle,
    personalHobbiesTitle,
    personalLanguagesTitle,
    personalSkillsTitle,
    personalToolsTitle,

    isPersonalPhoto,
    isPersonalFullName,
    isPersonalInfo,
    isPersonalHobbies,
    isPersonalLanguages,
    isPersonalSkills,
    isPersonalTools,
  }
}

export default useResumeTemplateSidebar
