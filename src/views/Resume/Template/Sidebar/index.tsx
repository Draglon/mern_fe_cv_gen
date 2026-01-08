"use client";
import { useTranslations } from "next-intl";
import { includes, pathOr } from "ramda";

import {
  TEMPLATES_PERSONAL_INFO_FULLNAME,
  TEMPLATES_SIDEBARS_SKILLS,
  TEMPLATES_SIDEBARS_TOOLS,
} from "@/lib/constants/templates";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { useAppSelector } from "@/store/hooks";
import {
  personalHobbiesIdSelector,
  personalLanguagesIdSelector,
  personalSkillsIdSelector,
  personalToolsIdSelector,
} from "@/store/auth/selectors";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalFullName from "@/views/shared/TemplateResume/PersonalFullName";
import PersonalPhoto from "@/views/shared/TemplateResume/PersonalPhoto";
import PersonalData from "@/views/shared/TemplateResume/PersonalData";
import PersonalHobbies from "@/views/shared/TemplateResume/PersonalHobbies";
import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

const ResumeTemplateSidebar = ({
  personalInfo,
  template,
  templateLanguage,
}: personalInfoProps) => {
  const t = useTranslations("Template");
  const personalHobbiesId = useAppSelector(personalHobbiesIdSelector);
  const personalLanguagesId = useAppSelector(personalLanguagesIdSelector);
  const personalSkillsId = useAppSelector(personalSkillsIdSelector);
  const personalToolsId = useAppSelector(personalToolsIdSelector);

  return (
    <div className="template__sidebar">
      {personalInfo && includes(template, TEMPLATES_PERSONAL_INFO_FULLNAME) && (
        <Section>
          <PersonalFullName
            personalFullName={personalInfo}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalInfo?.userUrl && (
        <Section>
          <PersonalPhoto
            src={personalInfo.userUrl}
            alt={t("personalPhoto.alt", { locale: templateLanguage })}
            width={170}
            height={170}
          />
        </Section>
      )}

      {personalInfo && (
        <Section
          title={pathOr(
            t("personalData.title", { locale: templateLanguage }),
            ["sectionTitle", templateLanguage],
            personalInfo
          )}
          size="small"
        >
          <PersonalData
            personalInfo={personalInfo}
            template={template}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalHobbiesId && (
        <Section
          title={t("personalHobbies.title", { locale: templateLanguage })}
          size="small"
        >
          <PersonalHobbies
            personalHobbiesId={personalHobbiesId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalLanguagesId && (
        <Section
          title={t("personalHobbies.title", { locale: templateLanguage })}
          size="small"
        >
          <PersonalLanguages
            personalLanguagesId={personalLanguagesId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalSkillsId && includes(template, TEMPLATES_SIDEBARS_SKILLS) && (
        <Section
          title={t("personalSkills.title", { locale: templateLanguage })}
          size="small"
        >
          <PersonalSkills
            personalSkillsId={personalSkillsId}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalToolsId && includes(template, TEMPLATES_SIDEBARS_TOOLS) && (
        <Section
          title={t("personalTools.title", { locale: templateLanguage })}
          size="small"
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

export default ResumeTemplateSidebar;
