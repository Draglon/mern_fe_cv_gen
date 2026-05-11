"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Locales } from "@/lib/constants/props/locales";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants/locales";

import Tabs from "@/views/shared/antd/Tabs";

type LocalTabsProp = {
  Component?: ReactNode;
  onChange: (locale: Locales) => void;
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
