"use client";
import Image from "next/image";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

import { LOCALES, FLAGS } from "@/lib/constants/locales";
import { Title, Text } from "@/views/shared/antd/Typography";

type ResumeTemplateCustomizationProps = {
  activeTemplateLanguage: string;
  setTemplateLanguage: Dispatch<SetStateAction<string>>;
};

const ResumeTemplateCustomization = ({
  activeTemplateLanguage,
  setTemplateLanguage,
}: ResumeTemplateCustomizationProps) => {
  const t = useTranslations("ResumeCustomization");

  return (
    <section className="template-settings">
      <Title className="template-settings__title" level={2}>
        {t("title")}
      </Title>
      <section className="template-settings__section">
        <Title className="template-settings__section-title" level={3}>
          {t("locale.title")}
        </Title>
        <ul className="template-settings__section-list">
          {LOCALES.map((locale) => (
            <li
              key={locale}
              className={clsx("template-settings__section-item", {
                "template-settings__section-item--active":
                  activeTemplateLanguage === locale,
              })}
              onClick={() => setTemplateLanguage(locale)}
              role="button"
            >
              <Image
                className="mr-8"
                src={FLAGS[locale]}
                alt={locale}
                width="24"
                height="16"
              />
              <Text className="template-settings__text">
                {t("locale.label", { locale })}
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ResumeTemplateCustomization;
