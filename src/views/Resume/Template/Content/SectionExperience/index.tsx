"use client";
import { useTranslations } from "next-intl";
import { pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { PersonalExperienceProps } from "@/lib/constants/props/resume";
import { experienceByLocale } from "@/utils/personalExperience";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";

type SectionExperienceProps = {
  templateLocale: Locales;
  personalExperience: PersonalExperienceProps;
};

const SectionExperience = ({
  personalExperience,
  templateLocale,
}: SectionExperienceProps) => {
  const t = useTranslations("Template");
  const experience = experienceByLocale(personalExperience, templateLocale);
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
        t("personalExperience.title", { locale: templateLocale }),
        ["sectionTitle", templateLocale],
        personalExperience
      )}
      text={
        lastPlacesOfWorks
          ? t("personalExperience.text", {
              locale: templateLocale,
              number: lastPlacesOfWorks,
            })
          : undefined
      }
    >
      <PersonalExperience
        experience={formattedExperience}
        templateLocale={templateLocale}
      />
    </Section>
  );
};

export default SectionExperience;
