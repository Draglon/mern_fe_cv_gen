"use client";
import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import {
  isErrorStatusForbidden,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";
import { getUserNameRules } from "@/utils/forms/validations/userNameValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideModal as hideModalAction } from "@/store/modal/actions";
import deleteAccount from "@/store/settings/operations/deleteAccount";
import { userIdSelector } from "@/store/auth/selectors";
import {
  isLoadingSelector,
  settingsErrorSelector,
} from "@/store/settings/selectors";

import Modal from "@/views/shared/antd/Modal";
import Alert from "@/views/shared/antd/Alert";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";

export type FieldType = {
  userName: string;
};

const DeleteAccountModal = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const router = useRouter();
  const userId = useAppSelector(userIdSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const settingsError = useAppSelector(settingsErrorSelector);

  const { control, handleSubmit, formState } = useForm<FieldType>({
    defaultValues: { userName: "" },
    mode: "onChange",
  });
  const { errors } = formState;
  const userNameRules = useMemo(() => getUserNameRules(tShared), [tShared]);

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = { userId, values, router, locale };
    await dispatch(deleteAccount(params));
  });

  const onCloseModal = () => {
    dispatch(hideModalAction());
  };

  return (
    <Modal
      className="modal"
      title={t("deleteAccount.modal.title")}
      onCancel={onCloseModal}
      footer={null}
    >
      {(isErrorStatusNotFound(settingsError) ||
        isErrorStatusForbidden(settingsError)) && (
        <Alert
          className="mb-16"
          type="error"
          title={t("deleteAccount.modal.form.alert.error")}
        />
      )}
      <Form
        name="deleteAccount"
        className="form--small"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <FormItem
          name="userName"
          controlName="userName"
          control={control}
          label={t("deleteAccount.modal.form.userName.label")}
          placeholder={tShared("form.userName.placeholder")}
          rules={userNameRules}
          errors={errors["userName"]}
          Field={InputField}
          size="large"
        />

        <Button
          className="form__button"
          color="danger"
          type="primary"
          htmlType="submit"
          size="large"
          disabled={isSubmitDisabled(formState)}
          loading={isLoading}
        >
          {t("deleteAccount.modal.form.submitButton")}
        </Button>
      </Form>
    </Modal>
  );
};

export default DeleteAccountModal;
