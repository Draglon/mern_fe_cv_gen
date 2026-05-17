"use client";
import useResumeTemplateContent from "@/hooks/useResumeTemplateContent";
import { ResumeProps, TemplateProps } from "@/lib/constants/props/resume";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalInfo from "@/views/shared/TemplateResume/PersonalInfo";
import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";
import PersonalEducation from "@/views/shared/TemplateResume/PersonalEducation";
import PersonalCourses from "@/views/shared/TemplateResume/PersonalCourses";
import PersonalSkills from "@/views/shared/TemplateResume/PersonalSkills";
import PersonalTools from "@/views/shared/TemplateResume/PersonalTools";

const ResumeTemplateContent = ({
  template,
  templateLocale,
  resume,
}: TemplateProps & { resume: ResumeProps }) => {
  const {
    personalInfoTitle,
    personalExperienceTitle,
    personalExperienceText,
    formattedExperience,
    personalEducationTitle,
    personalCoursesTitle,
    personalSkillsTitle,
    personalToolsTitle,
    isPersonalInfo,
    isPersonalExperience,
    isPersonalEducation,
    isPersonalCourses,
    isPersonalSkills,
    isPersonalTools,
  } = useResumeTemplateContent({
    template,
    templateLocale,
    resume,
  });

  return (
    <div className="template__container">
      {isPersonalInfo && (
        <Section title={personalInfoTitle}>
          <PersonalInfo
            personalInfo={resume.personalInfo}
            template={template}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalExperience && (
        <Section title={personalExperienceTitle} text={personalExperienceText}>
          <PersonalExperience
            experiences={formattedExperience}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalEducation && (
        <Section title={personalEducationTitle} className="section--education">
          <PersonalEducation
            personalEducation={resume.personalEducation}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalCourses && (
        <Section title={personalCoursesTitle} className="section--courses">
          <PersonalCourses
            personalCourses={resume.personalCourses}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalSkills && (
        <Section title={personalSkillsTitle} className="section--skills">
          <PersonalSkills
            personalSkills={resume.personalSkills}
            templateLocale={templateLocale}
          />
        </Section>
      )}

      {isPersonalTools && (
        <Section title={personalToolsTitle} className="section--tools">
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
