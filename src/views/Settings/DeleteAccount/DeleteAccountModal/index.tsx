"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { homeRoute } from "@/lib/routes";
import { FieldType } from "@/lib/constants/props/settings/deleteAccount";
import { DELETE_ACCOUNT_DEFAULT_VALUES } from "@/lib/constants/forms/settings/deleteAccount";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import clearAuthSession from "@/utils/clearAuthSession";
import {
  isErrorStatusForbidden,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";
import { getUserNameRules } from "@/utils/forms/validations/userNameValidation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideModal as hideModalAction } from "@/store/modal/actions";
import deleteAccount from "@/store/auth/operations/deleteAccount";
import { userErrorSelector } from "@/store/auth/selectors";

import Modal from "@/views/shared/antd/Modal";
import Alert from "@/views/shared/antd/Alert";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";

const DeleteAccountModal = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const tShared = useTranslations("shared");
  const router = useRouter();
  const userError = useAppSelector(userErrorSelector);

  const { control, handleSubmit, formState } = useForm<FieldType>({
    defaultValues: DELETE_ACCOUNT_DEFAULT_VALUES,
    mode: "onChange",
  });
  const userNameRules = useMemo(() => getUserNameRules(tShared), [tShared]);

  const onFinish = handleSubmit(async (values: FieldType) => {
    try {
      await dispatch(deleteAccount(values)).unwrap();
      await clearAuthSession(dispatch);

      dispatch(hideModalAction());

      router.push(homeRoute);
    } catch (error) {
      console.log(error);
    }
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
      {(isErrorStatusNotFound(userError) ||
        isErrorStatusForbidden(userError)) && (
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
          loading={isSubmitLoading(formState)}
        >
          {t("deleteAccount.modal.form.submitButton")}
        </Button>
      </Form>
    </Modal>
  );
};

export default DeleteAccountModal;
