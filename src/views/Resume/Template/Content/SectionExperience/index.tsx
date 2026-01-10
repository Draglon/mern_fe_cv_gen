"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { experienceByLocale } from "@/utils/personalExperience";
import fetchPersonalExperience from "@/store/personalExperience/operations/fetchPersonalExperience";
import { personalExperienceSelector } from "@/store/personalExperience/selectors";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";

type sectionExperienceProps = {
  personalExperienceId: string;
  templateLanguage: string;
};

const SectionExperience = ({
  personalExperienceId,
  templateLanguage,
}: sectionExperienceProps) => {
  const t = useTranslations("Template");
  const dispatch = useAppDispatch();
  const personalExperience = useAppSelector(personalExperienceSelector);
  const experience = experienceByLocale(
    personalExperience,
    templateLanguage as Locales
  );
  const lastPlacesOfWorks = pathOr(
    undefined,
    ["lastPlacesOfWorks"],
    personalExperience
  );
  const formattedExperience = experience.slice(
    0,
    lastPlacesOfWorks || experience.length
  );

  useEffect(() => {
    dispatch(fetchPersonalExperience({ id: personalExperienceId }));
  }, [dispatch, personalExperienceId]);

  return (
    <Section
      title={pathOr(
        t("personalExperience.title", { locale: templateLanguage }),
        ["sectionTitle", templateLanguage],
        personalExperience
      )}
      text={
        lastPlacesOfWorks
          ? t("personalExperience.text", {
              locale: templateLanguage,
              number: lastPlacesOfWorks,
            })
          : undefined
      }
    >
      <PersonalExperience
        experience={formattedExperience}
        templateLanguage={templateLanguage}
      />
    </Section>
  );
};

export default SectionExperience;
