"use client";
import { useTranslations } from "next-intl";

import GuestLayout from "@/views/layouts/GuestLayout";
import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";
import NavigationLink from "@/views/shared/NavigationLink";

const Home = () => {
  const t = useTranslations("Home");

  return (
    <GuestLayout>
      <div className="page__container text-center">
        <Title className="page__title" level={2}>
          {t("title")}
        </Title>
        <Title className="page__subtitle" level={4}>
          {t("subtitle")}
        </Title>
        <NavigationLink href="/login">
          <Button className="page__button" size="large">
            {t("createResumeButton")}
          </Button>
        </NavigationLink>
      </div>
    </GuestLayout>
  );
};

export default Home;
