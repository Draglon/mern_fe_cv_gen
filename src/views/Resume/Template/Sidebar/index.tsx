"use client";
import useResumeTemplateSidebar from "@/hooks/useResumeTemplateSidebar";
import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalFullName from "@/views/shared/TemplateResume/PersonalFullName";
import PersonalPhoto from "@/views/shared/TemplateResume/PersonalPhoto";
import PersonalData from "@/views/shared/TemplateResume/PersonalData";
import PersonalHobbies from "@/views/shared/TemplateResume/PersonalHobbies";
import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

const ResumeTemplateSidebar = ({
  template,
  templateLocale,
  resume,
}: TemplateProps & { resume: ResumeProps }) => {
  const {
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
  } = useResumeTemplateSidebar({
    template,
    templateLocale,
    resume,
  });

  return (
    <div className="template__sidebar">
      {isPersonalFullName && (
        <Section>
          <PersonalFullName
            personalInfo={resume.personalInfo}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalPhoto && (
        <Section>
          <PersonalPhoto
            src={personalPhoto as string}
            alt={personalPhotoAlt}
            width={170}
            height={170}
          />
        </Section>
      )}

      {isPersonalInfo && (
        <Section title={personalInfoTitle} size="small">
          <PersonalData
            personalInfo={resume.personalInfo}
            template={template}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalHobbies && (
        <Section title={personalHobbiesTitle} size="small">
          <PersonalHobbies
            personalHobbies={resume.personalHobbies}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalLanguages && (
        <Section title={personalLanguagesTitle} size="small">
          <PersonalLanguages
            personalLanguages={resume.personalLanguages}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalSkills && (
        <Section title={personalSkillsTitle} size="small">
          <PersonalSkills
            personalSkills={resume.personalSkills}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalTools && (
        <Section title={personalToolsTitle} size="small">
          <PersonalTools
            personalTools={resume.personalTools}
            templateLocale={templateLocale}
          />
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateSidebar;
