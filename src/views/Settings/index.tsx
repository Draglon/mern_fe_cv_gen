"use client";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/store/hooks";
import { showModal as showModalAction } from "@/store/modal/actions";

import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";

const Settings = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");

  const onRemoveAccount = () => {
    dispatch(showModalAction({ modalType: "REMOVE_ACCOUNT_MODAL" }));
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
