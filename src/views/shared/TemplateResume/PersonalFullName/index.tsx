"use client";
import profileName from "@/utils/profileName";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalInfoProps } from "@/lib/constants/props/resume";
import { Title } from "@/views/shared/antd/Typography";

type PersonalFullNameProps = {
  templateLocale: Locales;
  personalInfo: PersonalInfoProps;
};

const PersonalFullName = ({
  personalInfo,
  templateLocale,
}: PersonalFullNameProps) => {
  return (
    <section className="personal-fullname">
      <header className="personal-fullname__header">
        <Title className="personal-fullname__title" level={2}>
          {profileName(personalInfo, templateLocale)}
        </Title>
      </header>
    </section>
  );
};

export default PersonalFullName;
