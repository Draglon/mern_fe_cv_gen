"use client";
import { useTranslations } from "next-intl";

import { Title } from "@/views/shared/antd/Typography";
import ThemeSwitcher from "@/views/shared/ThemeSwitcher";

const GuestHeader = () => {
  const t = useTranslations("Stubs");

  return (
    <header className="page__header justify-content-space-between">
      <div className="wrapper text-left">
        <Title level={1}>{t("title")}</Title>
      </div>
      <div className="d-flex align-items-center gap-16">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default GuestHeader;
