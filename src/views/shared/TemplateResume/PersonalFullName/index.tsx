"use client";
import { useLocale } from "next-intl";

import profileName from "@/utils/profileName";
import { personalFullNameProps } from "@/lib/constants/props/resume";
import { Locales } from "@/lib/constants/props/locales";
import { Title } from "@/views/shared/antd/Typography";

const PersonalFullName = ({ personalFullName }: personalFullNameProps) => {
  const locale = useLocale();

  return (
    <section className="personal-fullname">
      <header className="personal-fullname__header">
        <Title className="personal-fullname__title" level={2}>
          {profileName(personalFullName, locale as Locales)}
        </Title>
      </header>
    </section>
  );
};

export default PersonalFullName;
