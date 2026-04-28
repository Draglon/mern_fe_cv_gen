"use client";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/store/hooks";
import { showModal as showModalAction } from "@/store/modal/actions";

import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");

  const onDeleteAccount = () => {
    dispatch(showModalAction({ modalType: "DELETE_ACCOUNT_MODAL" }));
  };

  return (
    <div className="mb-32">
      <div className="mb-24">
        <Title className="page__title mt-0" level={3}>
          {t("deleteAccount.title")}
        </Title>
      </div>
      <div>
        <Button
          size="large"
          color="danger"
          type="primary"
          onClick={onDeleteAccount}
          dataTestId="btnDeleteAccount"
          dataCy="btn-delete-account"
        >
          {t("deleteAccount.button")}
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
