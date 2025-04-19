"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { RESUME_ITEMS, DEFAULT_RESUME_ITEM } from "@/lib/constants/resume";
import Tabs from "@/views/shared/antd/Tabs";
import LocalTabs from "@/views/shared/LocalTabs";
import { Title } from "@/views/shared/antd/Typography";

type ResumeEditProps = {
  activeTab?: string;
};

const ResumeEdit = ({ activeTab }: ResumeEditProps) => {
  const t = useTranslations("ResumeEdit");
  const [currentTab, setCurrentTab] = useState(
    activeTab || DEFAULT_RESUME_ITEM
  );
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
    children: (
      <LocalTabs
        onChange={onChangeLocale}
        Component={<Component locale={locale} isEdit />}
      />
    ),
  }));

  return (
    <div className="page__container">
      <div className="page__block">
        <header className="text-center mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
        <Tabs
          items={EDIT_RESUME_TABS}
          defaultActiveKey={currentTab}
          onChange={onChangeTab}
        />
      </div>
    </div>
  );
};

export default ResumeEdit;
