"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { personalInfoProps } from "@/lib/constants/props/resume";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";
import fetchPersonalLanguages from "@/store/personalLanguages/operations/fetchPersonalLanguages";
import {
  personalHobbiesIdSelector,
  personalLanguagesIdSelector,
} from "@/store/auth/selectors";
import { personalHobbiesSelector } from "@/store/personalHobbies/selectors";
import { personalLanguagesSelector } from "@/store/personalLanguages/selectors";

import Avatar from "@/views/shared/TemplateResume/Avatar";
import Section from "@/views/shared/TemplateResume/Section";
import PersonalData from "@/views/shared/TemplateResume/PersonalData";
import PersonalHobbies from "@/views/shared/TemplateResume/PersonalHobbies";
import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";

const ResumeSidebar = ({ personalInfo }: personalInfoProps) => {
  const t = useTranslations("Template");
  const dispatch = useAppDispatch();
  const personalHobbiesId = useAppSelector(personalHobbiesIdSelector);
  const personalHobbiesData = useAppSelector(personalHobbiesSelector);
  const personalLanguagesId = useAppSelector(personalLanguagesIdSelector);
  const personalLanguagesData = useAppSelector(personalLanguagesSelector);

  useEffect(() => {
    if (personalHobbiesId) {
      dispatch(fetchPersonalHobbies({ id: personalHobbiesId }));
    }
    if (personalLanguagesId) {
      dispatch(fetchPersonalLanguages({ id: personalLanguagesId }));
    }
  }, [dispatch, personalHobbiesId, personalLanguagesId]);

  return (
    <div className="template__sidebar">
      {personalInfo?.userUrl && (
        <Section>
          <Avatar
            src={personalInfo.userUrl}
            alt={t("personalPhoto.alt")}
            width={170}
            height={170}
          />
        </Section>
      )}

      {personalInfo && (
        <Section title={t("personalData.title")} size="small">
          <PersonalData personalInfo={personalInfo} />
        </Section>
      )}

      {personalHobbiesData && (
        <Section title={t("personalHobbies.title")} size="small">
          <PersonalHobbies hobbies={personalHobbiesData} />
        </Section>
      )}

      {personalLanguagesData && (
        <Section title={t("personalLanguages.title")} size="small">
          <PersonalLanguages languages={personalLanguagesData} />
        </Section>
      )}
    </div>
  );
};

export default ResumeSidebar;
