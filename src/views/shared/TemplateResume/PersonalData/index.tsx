"use client";
import { useTranslations } from "next-intl";
import { formatPhoneNumberIntl } from "react-phone-number-input";
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
import { PersonalInfoProps, TemplateProps } from "@/lib/constants/props/resume";
import { Text, Paragraph } from "@/views/shared/antd/Typography";

const PersonalData = ({
  template,
  templateLocale,
  personalInfo,
}: TemplateProps & { personalInfo: PersonalInfoProps }) => {
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
            {t("personalData.name", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {profileName(personalInfo, templateLocale)}
          </Paragraph>
        </div>
      )}

      {address && address[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <HomeOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.address", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {address[templateLocale]}
          </Paragraph>
        </div>
      )}

      {phoneNumber && phoneNumber[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <PhoneOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.phoneNumber", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {formatPhoneNumberIntl(phoneNumber[templateLocale])}
          </Paragraph>
        </div>
      )}

      {email && email[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <MailOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.email", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {email[templateLocale]}
          </Paragraph>
        </div>
      )}

      {telegram && telegram[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <SendOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.telegram", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {telegram[templateLocale]}
          </Paragraph>
        </div>
      )}

      {birthday && birthday[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <CalendarOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.birthday", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {birthday[templateLocale]}
          </Paragraph>
        </div>
      )}

      {linkedIn && linkedIn[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <LinkedinOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.linkedIn", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {linkedIn[templateLocale]}
          </Paragraph>
        </div>
      )}

      {portfolio && portfolio[templateLocale] && (
        <div className="personal-data__item">
          {includes(template, TEMPLATES_PERSONAL_DATA_ICONS) && (
            <LinkOutlined className="personal-data__icon" />
          )}
          <Text className="personal-data__text" strong>
            {t("personalData.portfolio", { locale: templateLocale })}
          </Text>
          <Paragraph className="personal-data__paragraph">
            {portfolio[templateLocale]}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default PersonalData;
