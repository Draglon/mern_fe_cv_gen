"use client";
import { useTranslations } from "next-intl";
import { equals, pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { TEMPLATES } from "@/lib/constants/templates";
import { useAppSelector } from "@/store/hooks";
import { resumeSelector } from "@/store/resume/selectors";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalInfo from "@/views/shared/TemplateResume/PersonalInfo";
import PersonalEducation from "@/views/shared/TemplateResume/PersonalEducation";
import PersonalCourses from "@/views/shared/TemplateResume/PersonalCourses";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";
import SectionExperience from "@/views/Resume/Template/Content/SectionExperience";

type ResumeTemplateContentProps = {
  template: string;
  templateLanguage: Locales;
};

const ResumeTemplateContent = ({
  template,
  templateLanguage,
}: ResumeTemplateContentProps) => {
  const t = useTranslations("Template");
  const resume: any = useAppSelector(resumeSelector);

  return (
    <div className="template__container">
      {resume?.personalInfo && (
        <Section title={t("personalInfo.title", { locale: templateLanguage })}>
          <PersonalInfo
            personalInfo={resume.personalInfo}
            template={template}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalExperience && (
        <SectionExperience
          personalExperience={resume.personalExperience}
          templateLanguage={templateLanguage}
        />
      )}

      {resume?.personalEducation && (
        <Section
          title={pathOr(
            t("personalEducation.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalEducation
          )}
          className="section--education"
        >
          <PersonalEducation
            personalEducation={resume.personalEducation}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalCourses && (
        <Section
          title={pathOr(
            t("personalCourses.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalCourses
          )}
          className="section--courses"
        >
          <PersonalCourses
            personalCourses={resume.personalCourses}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalSkills && !equals(template, TEMPLATES.edinburghPlus) && (
        <Section
          title={pathOr(
            t("personalSkills.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalSkills
          )}
          className="section--skills"
        >
          <PersonalSkills
            personalSkills={resume.personalSkills}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalTools && !equals(template, TEMPLATES.edinburghPlus) && (
        <Section
          title={pathOr(
            t("personalTools.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalTools
          )}
          className="section--tools"
        >
          <PersonalTools
            personalTools={resume.personalTools}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateContent;
