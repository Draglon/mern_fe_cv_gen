"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "@/lib/constants";
import { REGEX_EMAIL } from "@/lib/constants/regex";
import { FieldType } from "@/lib/constants/props/login";
import { LOGIN_DEFAULT_VALUES } from "@/lib/constants/login";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import {
  isErrorStatusUnauthorized,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";
import fetchAuth from "@/store/auth/operations/fetchAuth";
import { userErrorSelector, isLoadingSelector } from "@/store/auth/selectors";

import { Title, Paragraph } from "@/views/shared/antd/Typography";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";
import Alert from "@/views/shared/antd/Alert";

const Login = () => {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userError = useAppSelector(userErrorSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const { control, handleSubmit, formState, register } = useForm<FieldType>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: "onChange",
  });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = { values, router, locale };
    await dispatch(fetchAuth(params));
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
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            register={register("email", {
              required: t("form.email.errors.required"),
              pattern: {
                value: REGEX_EMAIL,
                message: t("form.email.errors.pattern"),
              },
              maxLength: {
                value: MAX_EMAIL_LENGTH,
                message: t("form.email.errors.maxLength", {
                  maxLength: MAX_EMAIL_LENGTH,
                }),
              },
            })}
            errors={errors["email"]}
            Field={InputField}
            size="large"
          />

          <FormItem
            name="password"
            type="password"
            controlName="password"
            control={control}
            label={t("form.password.label")}
            placeholder={t("form.password.placeholder")}
            register={register("password", {
              required: {
                value: true,
                message: t("form.password.errors.required"),
              },
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: t("form.password.errors.minLength", {
                  minLength: MIN_PASSWORD_LENGTH,
                }),
              },
              maxLength: {
                value: MAX_PASSWORD_LENGTH,
                message: t("form.password.errors.maxLength", {
                  maxLength: MAX_PASSWORD_LENGTH,
                }),
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
              loading={isLoading}
            >
              {t("submitButton")}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Login;
