import { useLocale } from "next-intl";

import profileName from "@/utils/profileName";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { Locales } from "@/lib/constants/props/locales";
import { Title, Paragraph } from "@/views/shared/antd/Typography";

const PersonalInfo = ({ personalInfo }: personalInfoProps) => {
  const locale = useLocale();
  const { about } = personalInfo;

  return (
    <section className="personal-info">
      <header className="personal-info__header">
        <Title className="personal-info__fullname" level={1}>
          {profileName(personalInfo, locale as Locales)}
        </Title>
      </header>
      {about && about[locale as Locales] && (
        <Paragraph className="personal-info__about">
          {about[locale as Locales]}
        </Paragraph>
      )}
    </section>
  );
};

export default PersonalInfo;
