"use client";
import { useTranslations } from "next-intl";
import { pathOr } from "ramda";

import { Locales, Locale } from "@/lib/constants/props/locales";
import { experienceByLocale } from "@/utils/personalExperience";

import Section from "@/views/shared/TemplateResume/Section";
import PersonalExperience from "@/views/shared/TemplateResume/PersonalExperience";

type sectionExperienceProps = {
  templateLanguage: Locales;
  personalExperience: {
    sectionTitle: Locale;
    experience: Locale;
  };
};

const SectionExperience = ({
  personalExperience,
  templateLanguage,
}: sectionExperienceProps) => {
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
