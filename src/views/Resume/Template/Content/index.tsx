"use client";
import { useTranslations } from "next-intl";
import { equals } from "ramda";

import { TEMPLATES } from "@/lib/constants/templates";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { useAppSelector } from "@/store/hooks";
import {
  personalExperienceIdSelector,
  personalEducationIdSelector,
  personalCoursesIdSelector,
  personalSkillsIdSelector,
  personalToolsIdSelector,
} from "@/store/auth/selectors";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalInfo from "@/views/shared/TemplateResume/PersonalInfo";
import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";
import PersonalEducation from "@/views/shared/TemplateResume/PersonalEducation";
import PersonalCourses from "@/views/shared/TemplateResume/PersonalCourses";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

const ResumeTemplateContent = ({
  personalInfo,
  template,
  templateLanguage,
}: personalInfoProps) => {
  const t = useTranslations("Template");
  const personalExperienceId = useAppSelector(personalExperienceIdSelector);
  const personalEducationId = useAppSelector(personalEducationIdSelector);
  const personalCoursesId = useAppSelector(personalCoursesIdSelector);
  const personalSkillsId = useAppSelector(personalSkillsIdSelector);
  const personalToolsId = useAppSelector(personalToolsIdSelector);

  return (
    <div className="template__container">
      {personalInfo && (
        <Section title={t("personalInfo.title", { locale: templateLanguage })}>
          <PersonalInfo
            personalInfo={personalInfo}
            template={template}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalExperienceId && (
        <Section
          title={t("personalExperience.title", { locale: templateLanguage })}
        >
          <PersonalExperience
            personalExperienceId={personalExperienceId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalEducationId && (
        <Section
          title={t("personalEducation.title", { locale: templateLanguage })}
          className="section--education"
        >
          <PersonalEducation
            personalEducationId={personalEducationId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalCoursesId && (
        <Section
          title={t("personalCourses.title", { locale: templateLanguage })}
          className="section--courses"
        >
          <PersonalCourses
            personalCoursesId={personalCoursesId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalSkillsId && !equals(template, TEMPLATES.edinburghPlus) && (
        <Section
          title={t("personalSkills.title", { locale: templateLanguage })}
          className="section--skills"
        >
          <PersonalSkills
            personalSkillsId={personalSkillsId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalToolsId && !equals(template, TEMPLATES.edinburghPlus) && (
        <Section
          title={t("personalTools.title", { locale: templateLanguage })}
          className="section--tools"
        >
          <PersonalTools
            personalToolsId={personalToolsId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateContent;
