"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import fetchRegister from "@/store/auth/operations/fetchRegister";
import { isLoadingSelector } from "@/store/auth/selectors";

import { Title, Paragraph } from "@/views/shared/antd/Typography";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";

type FieldType = {
  userName: string;
  email: string;
  password: string;
};

const defaultValues = {
  userName: "",
  email: "",
  password: "",
};

const Registration = () => {
  const locale = useLocale();
  const tRegistration = useTranslations("Registration");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const { control, handleSubmit, formState, register } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });
  const { errors } = formState;

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
          name="registration"
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
            register={register("userName", {
              required: tRegistration("form.userName.errors.required"),
            })}
            errors={errors["userName"]}
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
            register={register("email", {
              required: tRegistration("form.email.errors.required"),
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
            label={tRegistration("form.password.label")}
            placeholder={tRegistration("form.password.placeholder")}
            register={register("password", {
              required: {
                value: true,
                message: tRegistration("form.password.errors.required"),
              },
              minLength: {
                value: 6,
                message: tRegistration("form.password.errors.minLength"),
              },
              maxLength: {
                value: 20,
                message: tRegistration("form.password.errors.maxLength"),
              },
            })}
            errors={errors["password"]}
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
              disabled={isSubmitDisabled(formState, isLoading)}
              loading={isLoading}
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
