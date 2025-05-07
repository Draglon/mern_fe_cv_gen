"use client";
import { useLocale } from "next-intl";
import { equals } from "ramda";

import profileName from "@/utils/profileName";
import { TEMPLATES } from "@/lib/constants/templates";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { Locales } from "@/lib/constants/props/locales";
import { Title, Paragraph } from "@/views/shared/antd/Typography";

const PersonalInfo = ({ personalInfo, template }: personalInfoProps) => {
  const locale = useLocale();
  const { about } = personalInfo;

  return (
    <section className="personal-info">
      {equals(template, TEMPLATES.standford) && (
        <header className="personal-info__header">
          <Title className="personal-info__fullname" level={1}>
            {profileName(personalInfo, locale as Locales)}
          </Title>
        </header>
      )}
      {about && about[locale as Locales] && (
        <Paragraph className="personal-info__about">
          {about[locale as Locales]}
        </Paragraph>
      )}
    </section>
  );
};

export default PersonalInfo;
