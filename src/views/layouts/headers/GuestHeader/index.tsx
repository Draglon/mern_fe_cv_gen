"use client";
import { useTranslations } from "next-intl";

import { loginRoute, registrationRoute } from "@/lib/routes";

import NavigationLink from "@/views/shared/NavigationLink";
import Button from "@/views/shared/antd/Button";

const GuestHeader = () => {
  const t = useTranslations("shared");

  return (
    <header className="page__header justify-content-flex-end">
      <nav className="header__buttons">
        <NavigationLink className="header__button ml-16" href={loginRoute}>
          <Button dataTestId="btnLogIn" dataCy="btn-log-in">
            {t("logIn")}
          </Button>
        </NavigationLink>
        <NavigationLink
          className="header__button ml-16"
          href={registrationRoute}
        >
          <Button dataTestId="btnSignUp" dataCy="btn-sign-up">
            {t("signUp")}
          </Button>
        </NavigationLink>
      </nav>
    </header>
  );
};

export default GuestHeader;
