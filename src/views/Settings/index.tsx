"use client";
import { useTranslations } from "next-intl";

import { Title } from "@/views/shared/antd/Typography";

import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  const t = useTranslations("Settings");

  return (
    <div className="page__wrapper">
      <div className="page__block mb-32">
        <header className="mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
          <Title className="page__subtitle" level={4}>
            {t("subTitle")}
          </Title>
        </header>

        <ChangeEmail />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
