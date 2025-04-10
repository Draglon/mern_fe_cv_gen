"use client";
import { useTranslations, useLocale } from "next-intl";

import { redirect } from "@/i18n/navigation";
import { homeRoute } from "@/lib/routes";
import { useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/store/auth/actions";
import Button from "@/views/shared/antd/Button";

const Logout = () => {
  const t = useTranslations("shared");
  const locale = useLocale();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    redirect({ href: homeRoute, locale });
  };

  return (
    <Button role="button" type="link" color="default" onClick={onLogout}>
      {t("logout")}
    </Button>
  );
};

export default Logout;
