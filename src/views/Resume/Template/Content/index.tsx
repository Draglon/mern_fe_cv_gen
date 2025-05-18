"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

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
}: personalInfoProps) => {
  const t = useTranslations("Template");
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
        <PersonalInfo personalInfo={personalInfo} template={template} />
      )}

      {personalExperienceData && (
        <Section title={t("personalExperience.title")}>
          <PersonalExperience personalExperience={personalExperienceData} />
        </Section>
      )}

      {personalExperienceData && (
        <Section
          title={t("personalEducation.title")}
          className="section--education"
        >
          <PersonalEducation personalEducation={personalEducationData} />
        </Section>
      )}

      {personalCoursesData && (
        <Section
          title={t("personalCourses.title")}
          className="section--courses"
        >
          <PersonalCourses personalCourses={personalCoursesData} />
        </Section>
      )}

      {personalSkillsData && (
        <Section title={t("personalSkills.title")} className="section--skills">
          <PersonalSkills personalSkills={personalSkillsData} />
        </Section>
      )}

      {personalToolsData && (
        <Section title={t("personalTools.title")} className="section--tools">
          <PersonalTools personalTools={personalToolsData} />
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateContent;
