"use client";
import { useTranslations } from "next-intl";

import { loginRoute } from "@/lib/routes";

import GuestLayout from "@/views/layouts/GuestLayout";
import Button from "@/views/shared/antd/Button";
import NavigationLink from "@/views/shared/NavigationLink";
import { Title } from "@/views/shared/antd/Typography";

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
        <NavigationLink href={loginRoute}>
          <Button
            className="page__button"
            size="large"
            dataTestId="btnCreateResume"
          >
            {t("createResumeButton")}
          </Button>
        </NavigationLink>
      </div>
    </GuestLayout>
  );
};

export default Home;
