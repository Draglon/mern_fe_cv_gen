"use client";
import { useTranslations } from "next-intl";

// import Logo from "@/views/shared/Logo";
import NavigationLink from "@/views/shared/NavigationLink";
import Button from "@/views/shared/antd/Button";

const GuestHeader = () => {
  const t = useTranslations("shared");

  return (
    <header className="page__header">
      {/* <Logo /> */}
      <nav className="header__buttons">
        <NavigationLink className="header__button ml-16" href="/login">
          <Button>{t("logIn")}</Button>
        </NavigationLink>
        <NavigationLink className="header__button ml-16" href="/registration">
          <Button>{t("signUp")}</Button>
        </NavigationLink>
      </nav>
    </header>
  );
};

export default GuestHeader;
