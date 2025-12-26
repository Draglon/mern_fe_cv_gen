"use client";
import { useTranslations } from "next-intl";
import { equals, path } from "ramda";
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

const PersonalData = ({
  personalInfo,
  template,
  templateLanguage,
}: personalInfoProps) => {
  const t = useTranslations("Template");
  const { address, phoneNumber, email, birthday, linkedIn } = personalInfo;

  return (
    <div className="personal-data">
      {equals(template, TEMPLATES.standford) && (
        <div className="personal-data__item">
          <Text className="personal-data__text" strong>
            {t("name", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {profileName(personalInfo, templateLanguage as Locales)}
          </Paragraph>
        </div>
      )}
      {address && address[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <HomeFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.address", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {address[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}
      {phoneNumber && phoneNumber[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <PhoneFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.phoneNumber", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {phoneNumber[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}
      {email && email[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <MailFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.email", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {email[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}
      {birthday && birthday[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <CalendarFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.birthday", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {birthday[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}
      {linkedIn && linkedIn[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {equals(template, TEMPLATES.edinburgh) && (
            <LinkedinFilled className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.linkedIn", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {linkedIn[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default PersonalData;
