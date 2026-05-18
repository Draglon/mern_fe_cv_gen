"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import { Locales } from "@/lib/constants/props/locales";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import {
  RESUME_ITEMS,
  DEFAULT_RESUME_ITEM,
  ResumeKey,
} from "@/lib/constants/resume";

import Tabs from "@/views/shared/antd/Tabs";
import LocalTabs from "@/views/shared/LocalTabs";
import { Title } from "@/views/shared/antd/Typography";

const ResumeEdit = () => {
  const t = useTranslations("ResumeEdit");
  const [currentTab, setCurrentTab] = useState<ResumeKey>(DEFAULT_RESUME_ITEM);
  const [resumeLocale, setResumeLocale] = useState<Locales>(DEFAULT_LOCALE);

  const onChangeTab = (tabKey: string): void => {
    if (RESUME_ITEMS.some((item) => item.key === tabKey)) {
      setCurrentTab(tabKey as ResumeKey);
    }
  };

  const onChangeLocale = (locale: string): void => {
    setResumeLocale(locale as Locales);
  };

  const EDIT_RESUME_TABS = useMemo(
    () =>
      RESUME_ITEMS.map(({ key, Component }) => ({
        key,
        label: t(`tabs.${key}`),
        children: <Component resumeLocale={resumeLocale} isEdit />,
      })),
    [resumeLocale, t]
  );

  return (
    <div className="page__wrapper">
      <div className="page__block">
        <header className="mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
        <LocalTabs onChange={onChangeLocale} />
        <Tabs
          items={EDIT_RESUME_TABS}
          activeKey={currentTab}
          onChange={onChangeTab}
        />
      </div>
    </div>
  );
};

export default ResumeEdit;
