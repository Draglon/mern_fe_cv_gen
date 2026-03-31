"use client";
import profileName from "@/utils/profileName";
import { personalFullNameProps } from "@/lib/constants/props/resume";
import { Title } from "@/views/shared/antd/Typography";

const PersonalFullName = ({
  personalFullName,
  templateLanguage,
}: personalFullNameProps) => {
  return (
    <section className="personal-fullname">
      <header className="personal-fullname__header">
        <Title className="personal-fullname__title" level={2}>
          {profileName(personalFullName, templateLanguage)}
        </Title>
      </header>
    </section>
  );
};

export default PersonalFullName;
