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

  const experiences = experienceByLocale(personalExperience, templateLocale);
  const recentPositionsCount = pathOr(
    undefined,
    ["recentPositionsCount"],
    personalExperience
  );
  const formattedExperience = experiences.slice(
    0,
    recentPositionsCount || experiences.length
  );

  return (
    <Section
      title={pathOr(
        t("personalExperience.title", { locale: templateLocale }),
        ["sectionTitle", templateLocale],
        personalExperience
      )}
      text={
        recentPositionsCount
          ? t("personalExperience.text", {
              locale: templateLocale,
              number: recentPositionsCount,
            })
          : undefined
      }
    >
      <PersonalExperience
        experiences={formattedExperience}
        templateLocale={templateLocale}
      />
    </Section>
  );
};

export default SectionExperience;
