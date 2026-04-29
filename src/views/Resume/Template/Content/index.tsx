"use client";
import { useTranslations } from "next-intl";
import { isEmpty, equals, pathOr } from "ramda";

import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";
import { TEMPLATES } from "@/lib/constants/templates";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalInfo from "@/views/shared/TemplateResume/PersonalInfo";
import PersonalEducation from "@/views/shared/TemplateResume/PersonalEducation";
import PersonalCourses from "@/views/shared/TemplateResume/PersonalCourses";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";
import SectionExperience from "@/views/Resume/Template/Content/SectionExperience";

const ResumeTemplateContent = ({
  template,
  templateLocale,
  resume,
}: TemplateProps & { resume: ResumeProps }) => {
  const t = useTranslations("Template");

  return (
    <div className="template__container">
      {!isEmpty(resume?.personalInfo) && (
        <Section title={t("personalInfo.title", { locale: templateLocale })}>
          <PersonalInfo
            personalInfo={resume.personalInfo}
            template={template}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {!isEmpty(resume?.personalExperience) && (
        <SectionExperience
          personalExperience={resume.personalExperience}
          templateLocale={templateLocale}
        />
      )}

      {!isEmpty(resume?.personalEducation) && (
        <Section
          title={pathOr(
            t("personalEducation.title", { locale: templateLocale }),
            ["sectionTitle", templateLocale],
            resume.personalEducation
          )}
          className="section--education"
        >
          <PersonalEducation
            personalEducation={resume.personalEducation}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {!isEmpty(resume?.personalCourses) && (
        <Section
          title={pathOr(
            t("personalCourses.title", { locale: templateLocale }),
            ["sectionTitle", templateLocale],
            resume.personalCourses
          )}
          className="section--courses"
        >
          <PersonalCourses
            personalCourses={resume.personalCourses}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {!isEmpty(resume?.personalSkills) &&
        !equals(template, TEMPLATES.edinburghPlus) && (
          <Section
            title={pathOr(
              t("personalSkills.title", { locale: templateLocale }),
              ["sectionTitle", templateLocale],
              resume.personalSkills
            )}
            className="section--skills"
          >
            <PersonalSkills
              personalSkills={resume.personalSkills}
              templateLocale={templateLocale}
            />
          </Section>
        )}

      {!isEmpty(resume?.personalTools) &&
        !equals(template, TEMPLATES.edinburghPlus) && (
          <Section
            title={pathOr(
              t("personalTools.title", { locale: templateLocale }),
              ["sectionTitle", templateLocale],
              resume.personalTools
            )}
            className="section--tools"
          >
            <PersonalTools
              personalTools={resume.personalTools}
              templateLocale={templateLocale}
            />
          </Section>
        )}
    </div>
  );
};

export default ResumeTemplateContent;
