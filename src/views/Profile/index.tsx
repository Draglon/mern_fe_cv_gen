"use client";
import { useTranslations } from "next-intl";

import { Title } from "@/views/shared/antd/Typography";

const Home = () => {
  const t = useTranslations("Profile");

  return (
    <div className="page__wrapper">
      <div className="page__block">
        <header className="mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
      </div>
    </div>
  );
};

export default Home;
