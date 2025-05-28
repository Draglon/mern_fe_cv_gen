"use client";
import { useEffect } from "react";
import { pathOr, path } from "ramda";

import { TEMPLATES_TRANSLATIONS } from "@/lib/constants/templates";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import fetchPersonalEducation from "@/store/personalEducation/operations/fetchPersonalEducation";
import fetchPersonalCourses from "@/store/personalCourses/operations/fetchPersonalCourses";
import fetchPersonalSkills from "@/store/personalSkills/operations/fetchPersonalSkills";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import {
  personalExperienceIdSelector,
  personalEducationIdSelector,
  personalCoursesIdSelector,
  personalSkillsIdSelector,
  personalToolsIdSelector,
} from "@/store/auth/selectors";
import { personalExperienceSelector } from "@/store/personalExperience/selectors";
import { personalEducationSelector } from "@/store/personalEducation/selectors";
import { personalCoursesSelector } from "@/store/personalCourses/selectors";
import { personalSkillsSelector } from "@/store/personalSkills/selectors";
import { personalToolsSelector } from "@/store/personalTools/selectors";

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
  const dispatch = useAppDispatch();
  const personalExperienceId = useAppSelector(personalExperienceIdSelector);
  const personalExperienceData = useAppSelector(personalExperienceSelector);
  const personalEducationId = useAppSelector(personalEducationIdSelector);
  const personalEducationData = useAppSelector(personalEducationSelector);
  const personalCoursesId = useAppSelector(personalCoursesIdSelector);
  const personalCoursesData = useAppSelector(personalCoursesSelector);
  const personalSkillsId = useAppSelector(personalSkillsIdSelector);
  const personalSkillsData = useAppSelector(personalSkillsSelector);
  const personalToolsId = useAppSelector(personalToolsIdSelector);
  const personalToolsData = useAppSelector(personalToolsSelector);

  useEffect(() => {
    if (personalExperienceId) {
      dispatch(fetchPersonalExperience({ id: personalExperienceId }));
    }
    if (personalEducationId) {
      dispatch(fetchPersonalEducation({ id: personalEducationId }));
    }
    if (personalCoursesId) {
      dispatch(fetchPersonalCourses({ id: personalCoursesId }));
    }
    if (personalSkillsId) {
      dispatch(fetchPersonalSkills({ id: personalSkillsId }));
    }
    if (personalToolsId) {
      dispatch(fetchPersonalTools({ id: personalToolsId }));
    }
  }, [
    dispatch,
    personalExperienceId,
    personalEducationId,
    personalCoursesId,
    personalSkillsId,
    personalToolsId,
  ]);

  return (
    <div className="template__container">
      {personalInfo && (
        <Section
          title={path(
            [templateLanguage, "personalInfo", "title"],
            TEMPLATES_TRANSLATIONS
          )}
        >
          <PersonalInfo
            personalInfo={personalInfo}
            template={template}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalExperienceData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalExperience", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalExperienceData
          )}
        >
          <PersonalExperience
            personalExperience={personalExperienceData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalExperienceData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalEducation", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalEducationData
          )}
          className="section--education"
        >
          <PersonalEducation
            personalEducation={personalEducationData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalCoursesData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalCourses", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalEducationData
          )}
          className="section--courses"
        >
          <PersonalCourses
            personalCourses={personalCoursesData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalSkillsData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalSkills", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalSkillsData
          )}
          className="section--skills"
        >
          <PersonalSkills
            personalSkills={personalSkillsData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalToolsData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalTools", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalToolsData
          )}
          className="section--tools"
        >
          <PersonalTools
            personalTools={personalToolsData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateContent;
