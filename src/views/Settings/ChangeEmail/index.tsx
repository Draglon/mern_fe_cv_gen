"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "@/lib/constants";
import {
  REGEX_EMAIL,
  REGEX_HAS_DIGITS,
  REGEX_HAS_LETTERS,
} from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import updateUserEmail from "@/store/auth/operations/updateUserEmail";
import { userEmailSelector } from "@/store/auth/selectors";

import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";

type FieldType = {
  newEmail: string;
  password: string;
};

const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const email = useAppSelector(userEmailSelector) as string;
  const { control, handleSubmit, formState, register, setError, reset } =
    useForm<FieldType>({
      defaultValues: {
        newEmail: email || "",
        password: "",
      },
      mode: "onChange",
    });
  const { errors } = formState;

  useEffect(() => {
    if (email) {
      reset({
        newEmail: email,
        password: "",
      });
    }
  }, [email, reset]);

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = { values, form: { setError }, tSettings: t };
    await dispatch(updateUserEmail(params));
  });

  return (
    <section className="page__card mb-32">
      <header className="mb-24">
        <Title className="page__title mt-0" level={3}>
          {t("changeEmail.title")}
        </Title>
      </header>
      <Form
        name="changeEmail"
        className="form--small"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <FormItem
          name="newEmail"
          type="email"
          controlName="newEmail"
          control={control}
          label={t("changeEmail.form.email.label")}
          placeholder={t("changeEmail.form.email.placeholder")}
          register={register("newEmail", {
            required: t("changeEmail.form.email.errors.required"),
            pattern: {
              value: REGEX_EMAIL,
              message: t("changeEmail.form.email.errors.pattern"),
            },
            maxLength: {
              value: MAX_EMAIL_LENGTH,
              message: t("changeEmail.form.email.errors.maxLength", {
                maxLength: MAX_EMAIL_LENGTH,
              }),
            },
          })}
          errors={errors["newEmail"]}
          Field={InputField}
          size="large"
        />

        <FormItem
          name="password"
          type="password"
          controlName="password"
          control={control}
          label={t("changeEmail.form.password.label")}
          placeholder={t("changeEmail.form.password.placeholder")}
          register={register("password", {
            required: {
              value: true,
              message: t("changeEmail.form.password.errors.required"),
            },
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: t("changeEmail.form.password.errors.minLength", {
                minLength: MIN_PASSWORD_LENGTH,
              }),
            },
            maxLength: {
              value: MAX_PASSWORD_LENGTH,
              message: t("changeEmail.form.password.errors.maxLength", {
                maxLength: MAX_PASSWORD_LENGTH,
              }),
            },
            validate: {
              hasUppercase: (value: string) =>
                REGEX_HAS_LETTERS.test(value) ||
                t("changeEmail.form.password.errors.uppercase"),
              hasNumber: (value: string) =>
                REGEX_HAS_DIGITS.test(value) ||
                t("changeEmail.form.password.errors.number"),
            },
          })}
          errors={errors["password"]}
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
            {t("changeEmail.form.submitButton")}
          </Button>
        </FormItem>
      </Form>
    </section>
  );
};

export default ChangeEmail;
