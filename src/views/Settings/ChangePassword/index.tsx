"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { FieldType } from "@/lib/constants/props/settings/changePassword";
import { CHANGE_PASSWORD_DEFAULT_VALUES } from "@/lib/constants/forms/settings/changePassword";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import {
  isErrorCodeIncorrectCurrentPassword,
  isErrorCodeNewPasswordEqualsOld,
} from "@/utils/getErrorCode";
import {
  getPasswordRules,
  getConfirmPasswordRules,
} from "@/utils/forms/validations/passwordValidation";
import { useAppDispatch } from "@/store/hooks";
import updateUserPassword from "@/store/auth/operations/updateUserPassword";

import FormItem from "@/views/shared/FormItem";
import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";
import Form from "@/views/shared/antd/Form";
import InputField from "@/views/shared/InputField";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const tShared = useTranslations("shared");
  const {
    control,
    handleSubmit,
    formState,
    setError,
    reset,
    getValues,
    trigger,
  } = useForm<FieldType>({
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
    mode: "onChange",
  });
  const { errors } = formState;
  const passwordRules = useMemo(() => getPasswordRules(tShared), [tShared]);

  const confirmPasswordRules = useMemo(
    () =>
      getConfirmPasswordRules({
        t,
        getValues,
        trigger,
      }),
    [t, getValues, trigger]
  );

  const onFinish = handleSubmit(async (values: FieldType) => {
    try {
      await dispatch(updateUserPassword(values)).unwrap();
      reset(CHANGE_PASSWORD_DEFAULT_VALUES);
    } catch (error) {
      if (isErrorCodeIncorrectCurrentPassword(error)) {
        setError("currentPassword", {
          type: "manual",
          message: t("changePassword.form.password.errors.currentPassword"),
        });
      }
      if (isErrorCodeNewPasswordEqualsOld(error)) {
        setError("newPassword", {
          type: "manual",
          message: t("changePassword.form.password.errors.newPassword"),
        });
      }
    }
  });

  return (
    <section className="page__card mb-32">
      <header className="mb-24">
        <Title className="page__title mt-0" level={3}>
          {t("changePassword.title")}
        </Title>
      </header>
      <Form
        name="changePassword"
        className="form--small"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <FormItem
          name="currentPassword"
          type="password"
          controlName="currentPassword"
          control={control}
          label={t("changePassword.form.password.label.currentPassword")}
          placeholder={tShared("form.password.placeholder")}
          rules={passwordRules}
          errors={errors["currentPassword"]}
          Field={InputField}
          size="large"
        />

        <FormItem
          name="newPassword"
          type="password"
          controlName="newPassword"
          control={control}
          label={t("changePassword.form.password.label.newPassword")}
          placeholder={t(
            "changePassword.form.password.placeholder.newPassword"
          )}
          rules={passwordRules}
          errors={errors["newPassword"]}
          Field={InputField}
          size="large"
        />

        <FormItem
          name="confirmPassword"
          type="password"
          controlName="confirmPassword"
          control={control}
          label={t("changePassword.form.password.label.confirmPassword")}
          placeholder={t(
            "changePassword.form.password.placeholder.confirmPassword"
          )}
          rules={confirmPasswordRules}
          errors={errors["confirmPassword"]}
          Field={InputField}
          size="large"
        />

        <Button
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
          block
          disabled={isSubmitDisabled(formState)}
          loading={isSubmitLoading(formState)}
        >
          {tShared("form.submitButton")}
        </Button>
      </Form>
    </section>
  );
};

export default ChangePassword;
