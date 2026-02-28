"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import fetchAuth from "@/store/auth/operations/fetchAuth";
import { isLoadingSelector } from "@/store/auth/selectors";

import { Title, Paragraph } from "@/views/shared/antd/Typography";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";

type FieldType = {
  email?: string;
  password?: string;
};

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const t = useTranslations("Login");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const { control, handleSubmit, formState, register } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }

    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
      redirect({ href: resumeRoute, locale });
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
        </header>
        <Form
          name="login"
          className="form form--small"
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
                value: 6,
                message: t("form.password.errors.minLength"),
              },
              maxLength: {
                value: 20,
                message: t("form.password.errors.maxLength"),
              },
            })}
            errors={errors["password"]}
            Field={InputField}
            size="large"
          />

          <Form.Item label={null} className="form__item">
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
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
