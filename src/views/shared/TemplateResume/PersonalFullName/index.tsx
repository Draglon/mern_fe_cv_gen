"use client";
import profileName from "@/utils/profileName";
import { personalFullNameProps } from "@/lib/constants/props/resume";
import { Locales } from "@/lib/constants/props/locales";
import { Title } from "@/views/shared/antd/Typography";

const PersonalFullName = ({
  personalFullName,
  templateLanguage,
}: personalFullNameProps) => {
  return (
    <section className="personal-fullname">
      <header className="personal-fullname__header">
        <Title className="personal-fullname__title" level={2}>
          {profileName(personalFullName, templateLanguage as Locales)}
        </Title>
      </header>
    </section>
  );
};

export default PersonalFullName;
