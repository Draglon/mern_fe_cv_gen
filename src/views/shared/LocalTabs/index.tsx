"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import Tabs from "@/views/shared/antd/Tabs";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants/locales";

type LocalTabsProp = {
  Component?: ReactNode;
  onChange: any;
};

const LocalTabs = ({ Component, onChange }: LocalTabsProp) => {
  const t = useTranslations("LocaleTabs");

  const items = LOCALES.map((locale) => ({
    key: locale,
    label: t(locale),
    children: Component,
  }));

  return (
    <Tabs
      className="locale-tabs"
      items={items}
      onChange={onChange}
      defaultActiveKey={DEFAULT_LOCALE}
    />
  );
};

export default LocalTabs;
