"use client";
import { useTranslations } from "next-intl";
import { includes, pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import {
  TEMPLATES_PERSONAL_INFO_FULLNAME,
  TEMPLATES_SIDEBARS_SKILLS,
  TEMPLATES_SIDEBARS_TOOLS,
} from "@/lib/constants/templates";
import { useAppSelector } from "@/store/hooks";
import { resumeSelector } from "@/store/resume/selectors";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalFullName from "@/views/shared/TemplateResume/PersonalFullName";
import PersonalPhoto from "@/views/shared/TemplateResume/PersonalPhoto";
import PersonalData from "@/views/shared/TemplateResume/PersonalData";
import PersonalHobbies from "@/views/shared/TemplateResume/PersonalHobbies";
import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

type ResumeTemplateSidebarProps = {
  template: string;
  templateLanguage: Locales;
};

const ResumeTemplateSidebar = ({
  template,
  templateLanguage,
}: ResumeTemplateSidebarProps) => {
  const t = useTranslations("Template");
  const resume = useAppSelector(resumeSelector);

  return (
    <div className="template__sidebar">
      {resume?.personalInfo &&
        includes(template, TEMPLATES_PERSONAL_INFO_FULLNAME) && (
          <Section>
            <PersonalFullName
              personalFullName={resume.personalInfo}
              templateLanguage={templateLanguage}
            />
          </Section>
        )}

      {resume?.personalInfo?.userUrl && (
        <Section>
          <PersonalPhoto
            src={resume.personalInfo.userUrl}
            alt={t("personalPhoto.alt", { locale: templateLanguage })}
            width={170}
            height={170}
          />
        </Section>
      )}

      {resume?.personalInfo && (
        <Section
          title={pathOr(
            t("personalData.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalInfo
          )}
          size="small"
        >
          <PersonalData
            personalInfo={resume.personalInfo}
            template={template}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalHobbies && (
        <Section
          title={pathOr(
            t("personalHobbies.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalHobbies
          )}
          size="small"
        >
          <PersonalHobbies
            personalHobbies={resume.personalHobbies}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalLanguages && (
        <Section
          title={pathOr(
            t("personalLanguages.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            resume.personalLanguages
          )}
          size="small"
        >
          <PersonalLanguages
            personalLanguages={resume.personalLanguages}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {resume?.personalSkills &&
        includes(template, TEMPLATES_SIDEBARS_SKILLS) && (
          <Section
            title={pathOr(
              t("personalSkills.title", { locale: templateLanguage }),
              ["sectionTitle", templateLanguage],
              resume.personalSkills
            )}
            size="small"
          >
            <PersonalSkills
              personalSkills={resume.personalSkills}
              templateLanguage={templateLanguage}
            />
          </Section>
        )}

      {resume?.personalTools &&
        includes(template, TEMPLATES_SIDEBARS_TOOLS) && (
          <Section
            title={pathOr(
              t("personalTools.title", { locale: templateLanguage }),
              ["sectionTitle", templateLanguage],
              resume.personalTools
            )}
            size="small"
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

export default ResumeTemplateSidebar;
