"use client";
import { useTranslations } from "next-intl";
import { pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { PersonalExperienceProps } from "@/lib/constants/props/resume";
import { experienceByLocale } from "@/utils/personalExperience";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";

type SectionExperienceProps = {
  templateLanguage: Locales;
  personalExperience: PersonalExperienceProps;
};

const SectionExperience = ({
  personalExperience,
  templateLanguage,
}: SectionExperienceProps) => {
  const t = useTranslations("Template");
  const experience = experienceByLocale(personalExperience, templateLanguage);
  const lastPlacesOfWorks = pathOr(
    undefined,
    ["lastPlacesOfWorks"],
    personalExperience
  );
  const formattedExperience = experience.slice(
    0,
    lastPlacesOfWorks || experience.length
  );

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
