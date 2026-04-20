"use client";
import { useTranslations, useLocale } from "next-intl";

import { redirect } from "@/i18n/navigation";
import { homeRoute } from "@/lib/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import removeAccount from "@/store/settings/operations/removeAccount";
import { userIdSelector } from "@/store/auth/selectors";

import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";

const Settings = () => {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);

  const onRemoveAccount = () => {
    dispatch(removeAccount({ userId }));
    redirect({ href: homeRoute, locale });
  };

  return (
    <div className="page__wrapper">
      <div className="page__block mb-32">
        <header className="mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>
      </div>

      <div className="page__block">
        <div className="mb-24">
          <Title className="page__title mt-0" level={3}>
            {t("removeAccount.title")}
          </Title>
        </div>
        <div>
          <Button
            size="large"
            color="danger"
            type="primary"
            onClick={onRemoveAccount}
            dataTestId="btnRemoveAccount"
            dataCy="btn-remove-account"
          >
            {t("removeAccount.button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
