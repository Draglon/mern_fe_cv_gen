"use client";
import { useTranslations } from "next-intl";

import { Title } from "@/views/shared/antd/Typography";

const ResumeEdit = () => {
  const t = useTranslations("ResumeEdit");

  return (
    <div className="page__container">
      <div className="page__block">
        <header className="text-center mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
      </div>
    </div>
  );
};

export default ResumeEdit;
