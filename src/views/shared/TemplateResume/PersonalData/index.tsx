"use client";
import { useTranslations } from "next-intl";
import { equals, includes } from "ramda";
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  LinkedinOutlined,
  LinkOutlined,
  SendOutlined,
} from "@ant-design/icons";

import profileName from "@/utils/profileName";
import {
  TEMPLATES,
  TEMPLATES_PERSONAL_DATA_ICONS,
} from "@/lib/constants/templates";
import { personalInfoProps } from "@/lib/constants/props/resume";
import { Locales } from "@/lib/constants/props/locales";
import { Text, Paragraph } from "@/views/shared/antd/Typography";

const PersonalData = ({
  personalInfo,
  template,
  templateLanguage,
}: personalInfoProps) => {
  const t = useTranslations("Template");
  const {
    address,
    phoneNumber,
    email,
    birthday,
    linkedIn,
    telegram,
    portfolio,
  } = personalInfo;

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
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <HomeOutlined className="personal-data__icon" />
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
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <PhoneOutlined className="personal-data__icon" />
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
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <MailOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.email", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {email[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}

      {telegram && telegram[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <SendOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.telegram", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {telegram[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}

      {birthday && birthday[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <CalendarOutlined className="personal-data__icon" />
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
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <LinkedinOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.linkedIn", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {linkedIn[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}

      {portfolio && portfolio[templateLanguage as Locales] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <LinkOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.portfolio", { locale: templateLanguage })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {portfolio[templateLanguage as Locales]}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default PersonalData;
