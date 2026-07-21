"use client";
import { useTranslations } from "next-intl";

import { Title } from "@/views/shared/antd/Typography";
import ThemeSwitcher from "@/views/shared/ThemeSwitcher";

const UIKitHeader = () => {
  const t = useTranslations("UIKit");

  return (
    <header className="page__header justify-content-space-between">
      <div className="wrapper text-left">
        <Title className="page__title" level={1}>
          {t("title")}
        </Title>
      </div>
      <div className="d-flex align-items-center gap-16">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default UIKitHeader;
