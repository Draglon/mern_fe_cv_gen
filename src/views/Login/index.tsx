"use client";
import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { FieldType } from "@/lib/constants/props/login";
import { LOGIN_DEFAULT_VALUES } from "@/lib/constants/forms/login";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getEmailRules } from "@/utils/forms/validations/emailValidation";
import { getPasswordRules } from "@/utils/forms/validations/passwordValidation";
import {
  isErrorStatusUnauthorized,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";
import fetchAuth from "@/store/auth/operations/fetchAuth";
import { userErrorSelector } from "@/store/auth/selectors";

import { Title, Paragraph } from "@/views/shared/antd/Typography";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";
import Alert from "@/views/shared/antd/Alert";

const Login = () => {
  const locale = useLocale();
  const t = useTranslations("Login");
  const tShared = useTranslations("shared");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userError = useAppSelector(userErrorSelector);
  const { control, handleSubmit, formState } = useForm<FieldType>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: "onChange",
  });
  const passwordRules = useMemo(() => getPasswordRules(tShared), [tShared]);
  const emailRules = useMemo(() => getEmailRules(tShared), [tShared]);

  const onFinish = handleSubmit(async (values: FieldType) => {
    try {
      const data = await dispatch(fetchAuth({ ...values, locale })).unwrap();

      if (data?.token) {
        localStorage.setItem("token", data.token);
        router.push(resumeRoute);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="page__container page__container--small">
      <div className="page__block login">
        <header className="login__header">
          <Title className="page__title text-center">{t("title")}</Title>
          <Paragraph className="page__text text-center">
            {t("description")}
          </Paragraph>
          {(isErrorStatusUnauthorized(userError) ||
            isErrorStatusNotFound(userError)) && (
            <Alert
              type="error"
              title={t("alert.errors.invalidEmailOrPassword")}
            />
          )}
        </header>

        <Form
          name="login"
          className="form--small"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <FormItem
            name="email"
            type="email"
            controlName="email"
            control={control}
            label={tShared("form.email.label")}
            placeholder={tShared("form.email.placeholder")}
            rules={emailRules}
            Field={InputField}
            size="large"
          />

          <FormItem
            name="password"
            type="password"
            controlName="password"
            control={control}
            label={tShared("form.password.label")}
            placeholder={tShared("form.password.placeholder")}
            rules={passwordRules}
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
            {t("submitButton")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
