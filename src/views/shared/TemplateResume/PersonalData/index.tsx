"use client";
import { useLocale, useTranslations } from "next-intl";
import { equals } from "ramda";
import {
  HomeFilled,
  MailFilled,
  PhoneFilled,
  CalendarFilled,
  LinkedinFilled,
} from "@ant-design/icons";

import profileName from "@/utils/profileName";
import { TEMPLATES } from "@/lib/constants/templates";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { Locales } from "@/lib/constants/props/locales";
import { Text, Paragraph } from "@/views/shared/antd/Typography";

const PersonalData = ({ personalInfo, template }: personalInfoProps) => {
  const locale = useLocale();
  const t = useTranslations("Template.personalData");
  const { address, phoneNumber, email, birthday, linkedIn } = personalInfo;

  return (
    <div className="personal-data">
      {equals(template, TEMPLATES.standford) && (
        <div className="personal-data__item">
          <Text className="personal-data__text" strong>
            {t("name")}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {profileName(personalInfo, locale as Locales)}
          </Paragraph>
        </div>
      )}
      {address && address[locale as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <HomeFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("address")}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {address[locale as Locales]}
          </Paragraph>
        </div>
      )}
      {phoneNumber && phoneNumber[locale as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <PhoneFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("phoneNumber")}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {phoneNumber[locale as Locales]}
          </Paragraph>
        </div>
      )}
      {email && email[locale as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <MailFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("email")}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {email[locale as Locales]}
          </Paragraph>
        </div>
      )}
      {birthday && birthday[locale as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <CalendarFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("birthday")}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {birthday[locale as Locales]}
          </Paragraph>
        </div>
      )}
      {linkedIn && linkedIn[locale as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <LinkedinFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("linkedin")}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {linkedIn[locale as Locales]}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default PersonalData;
