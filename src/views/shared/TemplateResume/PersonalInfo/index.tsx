"use client";
import { equals } from "ramda";

import profileName from "@/utils/profileName";
import { TEMPLATES } from "@/lib/constants/templates";
import { PersonalInfoProps, TemplateProps } from "@/lib/constants/props/resume";
import { Title, Paragraph } from "@/views/shared/antd/Typography";

const PersonalInfo = ({
  template,
  templateLanguage,
  personalInfo,
}: TemplateProps & { personalInfo: PersonalInfoProps }) => {
  const { aboutMe } = personalInfo;

  return (
    <section className="personal-info">
      {equals(template, TEMPLATES.standford) && (
        <header className="personal-info__header">
          <Title className="personal-info__fullname" level={1}>
            {profileName(personalInfo, templateLanguage)}
          </Title>
        </header>
      )}
      {aboutMe && aboutMe[templateLanguage] && (
        <Paragraph className="personal-info__about">
          {aboutMe[templateLanguage]}
        </Paragraph>
      )}
    </section>
  );
};

export default PersonalInfo;
