"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "@/lib/constants";
import { REGEX_HAS_DIGITS, REGEX_HAS_LETTERS } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch } from "@/store/hooks";
import updateUserPassword from "@/store/auth/operations/updateUserPassword";

import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";

type FieldType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Settings = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const { control, handleSubmit, formState, register, setError } =
    useForm<FieldType>({
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      mode: "onChange",
    });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    const params = {
      values: { currentPassword, newPassword },
      form: { setError },
      tSettings: t,
    };

    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: t("changePassword.form.password.errors.confirmPassword"),
      });
    } else {
      await dispatch(updateUserPassword(params));
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
        name="login"
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
          placeholder={t("changePassword.form.password.placeholder")}
          register={register("currentPassword", {
            required: {
              value: true,
              message: t("changePassword.form.password.errors.required"),
            },
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: t("changePassword.form.password.errors.minLength", {
                minLength: MIN_PASSWORD_LENGTH,
              }),
            },
            maxLength: {
              value: MAX_PASSWORD_LENGTH,
              message: t("changePassword.form.password.errors.maxLength", {
                maxLength: MAX_PASSWORD_LENGTH,
              }),
            },
            validate: {
              hasUppercase: (value: string) =>
                REGEX_HAS_LETTERS.test(value) ||
                t("changePassword.form.password.errors.uppercase"),
              hasNumber: (value: string) =>
                REGEX_HAS_DIGITS.test(value) ||
                t("changePassword.form.password.errors.number"),
            },
          })}
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
          placeholder={t("changePassword.form.password.placeholder")}
          register={register("newPassword", {
            required: {
              value: true,
              message: t("changePassword.form.password.errors.required"),
            },
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: t("changePassword.form.password.errors.minLength", {
                minLength: MIN_PASSWORD_LENGTH,
              }),
            },
            maxLength: {
              value: MAX_PASSWORD_LENGTH,
              message: t("changePassword.form.password.errors.maxLength", {
                maxLength: MAX_PASSWORD_LENGTH,
              }),
            },
            validate: {
              hasUppercase: (value: string) =>
                REGEX_HAS_LETTERS.test(value) ||
                t("changePassword.form.password.errors.uppercase"),
              hasNumber: (value: string) =>
                REGEX_HAS_DIGITS.test(value) ||
                t("changePassword.form.password.errors.number"),
            },
          })}
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
          placeholder={t("changePassword.form.password.placeholder")}
          register={register("confirmPassword", {
            required: {
              value: true,
              message: t("changePassword.form.password.errors.required"),
            },
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: t("changePassword.form.password.errors.minLength", {
                minLength: MIN_PASSWORD_LENGTH,
              }),
            },
            maxLength: {
              value: MAX_PASSWORD_LENGTH,
              message: t("changePassword.form.password.errors.maxLength", {
                maxLength: MAX_PASSWORD_LENGTH,
              }),
            },
            validate: {
              hasUppercase: (value: string) =>
                REGEX_HAS_LETTERS.test(value) ||
                t("changePassword.form.password.errors.uppercase"),
              hasNumber: (value: string) =>
                REGEX_HAS_DIGITS.test(value) ||
                t("changePassword.form.password.errors.number"),
            },
          })}
          errors={errors["confirmPassword"]}
          Field={InputField}
          size="large"
        />

        <FormItem name="buttons">
          <Button
            className="form__button"
            type="primary"
            htmlType="submit"
            size="large"
            block
            disabled={isSubmitDisabled(formState)}
            loading={isSubmitLoading(formState)}
          >
            {t("changePassword.form.submitButton")}
          </Button>
        </FormItem>
      </Form>
    </section>
  );
};

export default Settings;
