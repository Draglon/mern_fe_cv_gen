"use client";
import { useEffect } from "react";
import { equals, pathOr, path } from "ramda";

import { TEMPLATES, TEMPLATES_TRANSLATIONS } from "@/lib/constants/templates";
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

import Section from "@/views/shared/TemplateResume/Section";
import PersonalFullName from "@/views/shared/TemplateResume/PersonalFullName";
import PersonalPhoto from "@/views/shared/TemplateResume/PersonalPhoto";
import PersonalData from "@/views/shared/TemplateResume/PersonalData";
import PersonalHobbies from "@/views/shared/TemplateResume/PersonalHobbies";
import PersonalLanguages from "@/views/shared/TemplateResume/PersonalLanguages";

const ResumeTemplateSidebar = ({
  personalInfo,
  template,
  templateLanguage,
}: personalInfoProps) => {
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
      {personalInfo && equals(template, TEMPLATES.edinburgh) && (
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
            alt={path(
              [templateLanguage, "personalPhoto", "alt"],
              TEMPLATES_TRANSLATIONS
            )}
            width={170}
            height={170}
          />
        </Section>
      )}

      {personalInfo && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalData", "title"],
              TEMPLATES_TRANSLATIONS
            ),
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

      {personalHobbiesData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalHobbies", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalHobbiesData
          )}
          size="small"
        >
          <PersonalHobbies
            personalHobbies={personalHobbiesData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}

      {personalLanguagesData && (
        <Section
          title={pathOr(
            path(
              [templateLanguage, "personalLanguages", "title"],
              TEMPLATES_TRANSLATIONS
            ),
            ["sectionTitle", templateLanguage],
            personalLanguagesData
          )}
          size="small"
        >
          <PersonalLanguages
            personalLanguages={personalLanguagesData}
            templateLanguage={templateLanguage}
          />
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateSidebar;
