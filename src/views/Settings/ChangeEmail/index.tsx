"use client";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getPasswordRules } from "@/utils/forms/validations/passwordValidation";
import { getEmailRules } from "@/utils/forms/validations/emailValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import updateUserEmail from "@/store/auth/operations/updateUserEmail";
import { userEmailSelector } from "@/store/auth/selectors";

import { Title } from "@/views/shared/antd/Typography";
import Button from "@/views/shared/antd/Button";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";

type FieldType = {
  newEmail: string;
  password: string;
};

const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const tShared = useTranslations("shared");
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
  const passwordRules = useMemo(() => getPasswordRules(tShared), [tShared]);
  const emailRules = useMemo(() => getEmailRules(tShared), [tShared]);

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
          rules={emailRules}
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
          placeholder={tShared("form.password.placeholder")}
          rules={passwordRules}
          errors={errors["password"]}
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

export default ChangeEmail;
