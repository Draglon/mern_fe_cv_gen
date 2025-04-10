"use client";
import { useTranslations, useLocale } from "next-intl";
import type { FormProps } from "antd";
import { Form } from "antd";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { useAppDispatch } from "@/store/hooks";
import fetchAuth from "@/store/auth/operations/fetchAuth";
import { Title, Paragraph } from "@/views/shared/antd/Typography";
import InputField from "@/views/shared/antd/Input";
import Button from "@/views/shared/antd/Button";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const t = useTranslations("Login");
  const locale = useLocale();
  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }

    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
      redirect({ href: resumeRoute, locale });
    }
  };

  return (
    <div className="page__container page__container--small">
      <div className="page__block login">
        <header className="login__header">
          <Title className="page__title">{t("title")}</Title>
          <Paragraph className="page__text">{t("description")}</Paragraph>
        </header>
        <Form
          name="login"
          className="form form--small"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={t("form.email.label")}
            name="email"
            className="form__item"
            rules={[{ required: true, message: t("form.email.error") }]}
          >
            <InputField
              type="email"
              placeholder={t("form.email.placeholder")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t("form.password.label")}
            name="password"
            className="form__item"
            rules={[{ required: true, message: t("form.password.error") }]}
          >
            <InputField
              type="password"
              placeholder={t("form.password.placeholder")}
              size="large"
            />
          </Form.Item>

          <Form.Item label={null} className="form__item">
            <Button
              className="form__button"
              type="primary"
              htmlType="submit"
              size="large"
              block
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
