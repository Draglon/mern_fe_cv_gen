"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { useAppDispatch } from "@/store/hooks";
import fetchRegister from "@/store/auth/operations/fetchRegister";
import { Title, Paragraph } from "@/views/shared/antd/Typography";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/antd/Input";
import Button from "@/views/shared/antd/Button";

type FieldType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Registration = () => {
  const locale = useLocale();
  const tRegistration = useTranslations("Registration");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const data = await dispatch(fetchRegister(values));

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
          <Title className="page__title">{tRegistration("title")}</Title>
          <Paragraph className="page__text">
            {tRegistration("description")}
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
            name="userName"
            controlName="userName"
            control={control}
            label={tRegistration("form.userName.label")}
            placeholder={tRegistration("form.userName.placeholder")}
            rules={[
              {
                required: true,
                message: tRegistration("form.userName.error"),
              },
            ]}
            Field={InputField}
            size="large"
          />
          <FormItem
            name="email"
            type="email"
            controlName="email"
            control={control}
            label={tRegistration("form.email.label")}
            placeholder={tRegistration("form.email.placeholder")}
            rules={[
              { required: true, message: tRegistration("form.email.error") },
            ]}
            Field={InputField}
            size="large"
          />
          <FormItem
            name="password"
            type="password"
            controlName="password"
            control={control}
            label={tRegistration("form.password.label")}
            placeholder={tRegistration("form.password.placeholder")}
            rules={[
              { required: true, message: tRegistration("form.password.error") },
            ]}
            Field={InputField}
            size="large"
          />
          <FormItem name="buttons" label={null}>
            <Button
              className="form__button"
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              {tShared("signUp")}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
