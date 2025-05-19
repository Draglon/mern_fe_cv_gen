"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { RESUME_ITEMS, DEFAULT_RESUME_ITEM } from "@/lib/constants/resume";

import Tabs from "@/views/shared/antd/Tabs";
import LocalTabs from "@/views/shared/LocalTabs";
import { Title } from "@/views/shared/antd/Typography";

const ResumeEdit = () => {
  const t = useTranslations("ResumeEdit");
  const [currentTab, setCurrentTab] = useState(DEFAULT_RESUME_ITEM);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  const onChangeTab = (tabKey: string): void => {
    setCurrentTab(tabKey);
  };

  const onChangeLocale = (locale: string): void => {
    setLocale(locale);
  };

  const EDIT_RESUME_TABS = RESUME_ITEMS.map(({ key, Component }) => ({
    key: key,
    label: t(`tabs.${key}`),
    children: <Component locale={locale} isEdit />,
  }));

  return (
    <div className="page__wrapper">
      <div className="page__container">
        <div className="page__block">
          <header className="text-center mb-32">
            <Title className="page__title mt-0">{t("title")}</Title>
          </header>
          <LocalTabs onChange={onChangeLocale} />
          <Tabs
            items={EDIT_RESUME_TABS}
            defaultActiveKey={currentTab}
            onChange={onChangeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeEdit;
