"use client";
import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { FieldType } from "@/lib/constants/props/signup";
import { SIGNUP_DEFAULT_VALUES } from "@/lib/constants/forms/registration";
import { useAppDispatch } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getUserNameRules } from "@/utils/forms/validations/userNameValidation";
import { getEmailRules } from "@/utils/forms/validations/emailValidation";
import { getPasswordRules } from "@/utils/forms/validations/passwordValidation";
import fetchRegister from "@/store/auth/operations/fetchRegister";

import { Title, Paragraph } from "@/views/shared/antd/Typography";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";

const Registration = () => {
  const locale = useLocale();
  const router = useRouter();
  const tRegistration = useTranslations("Registration");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState, register, setError } =
    useForm<FieldType>({
      defaultValues: SIGNUP_DEFAULT_VALUES,
      mode: "onChange",
    });
  const { errors } = formState;
  const userNameRules = useMemo(() => getUserNameRules(tShared), [tShared]);
  const passwordRules = useMemo(() => getPasswordRules(tShared), [tShared]);
  const emailRules = useMemo(() => getEmailRules(tShared), [tShared]);

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      form: { setError },
      router,
      locale,
      t: tRegistration,
    };
    await dispatch(fetchRegister(params));
  });

  return (
    <div className="page__container page__container--small">
      <div className="page__block signup">
        <header className="login__header">
          <Title className="page__title text-center">
            {tRegistration("title")}
          </Title>
          <Paragraph className="page__text text-center">
            {tRegistration("description")}
          </Paragraph>
        </header>
        <Form
          name="registration"
          className="form--small"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <FormItem
            name="userName"
            controlName="userName"
            control={control}
            label={tShared("form.userName.label")}
            placeholder={tShared("form.userName.placeholder")}
            rules={userNameRules}
            errors={errors["userName"]}
            Field={InputField}
            size="large"
          />

          <FormItem
            name="email"
            type="email"
            controlName="email"
            control={control}
            label={tShared("form.email.label")}
            placeholder={tShared("form.email.placeholder")}
            rules={emailRules}
            errors={errors["email"]}
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
            {tShared("signUp")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
