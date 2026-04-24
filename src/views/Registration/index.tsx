"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import {
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
} from "@/lib/constants";
import {
  REGEX_EMAIL,
  REGEX_NICK_NAME,
  REGEX_HAS_LETTERS,
  REGEX_HAS_DIGITS,
} from "@/lib/constants/regex";
import { FieldType } from "@/lib/constants/props/signup";
import { SIGNUP_DEFAULT_VALUES } from "@/lib/constants/signup";
import { useAppDispatch } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import fetchRegister from "@/store/auth/operations/fetchRegister";

import { Title, Paragraph } from "@/views/shared/antd/Typography";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/antd/FormItem";
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
            label={tRegistration("form.userName.label")}
            placeholder={tRegistration("form.userName.placeholder")}
            register={register("userName", {
              required: tRegistration("form.userName.errors.required"),
              pattern: {
                value: REGEX_NICK_NAME,
                message: tRegistration("form.userName.errors.pattern"),
              },
              minLength: {
                value: MIN_NIKE_NAME_LENGTH,
                message: tRegistration("form.userName.errors.minLength", {
                  minLength: MIN_NIKE_NAME_LENGTH,
                }),
              },
              maxLength: {
                value: MAX_NIKE_NAME_LENGTH,
                message: tRegistration("form.userName.errors.maxLength", {
                  maxLength: MAX_NIKE_NAME_LENGTH,
                }),
              },
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
              pattern: {
                value: REGEX_EMAIL,
                message: tRegistration("form.email.errors.pattern"),
              },
              maxLength: {
                value: MAX_EMAIL_LENGTH,
                message: tRegistration("form.email.errors.maxLength", {
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
            label={tRegistration("form.password.label")}
            placeholder={tRegistration("form.password.placeholder")}
            register={register("password", {
              required: {
                value: true,
                message: tRegistration("form.password.errors.required"),
              },
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: tRegistration("form.password.errors.minLength", {
                  minLength: MIN_PASSWORD_LENGTH,
                }),
              },
              maxLength: {
                value: MAX_PASSWORD_LENGTH,
                message: tRegistration("form.password.errors.maxLength", {
                  maxLength: MAX_PASSWORD_LENGTH,
                }),
              },
              validate: {
                hasUppercase: (value: string) =>
                  REGEX_HAS_LETTERS.test(value) ||
                  tRegistration("form.password.errors.uppercase"),
                hasNumber: (value: string) =>
                  REGEX_HAS_DIGITS.test(value) ||
                  tRegistration("form.password.errors.number"),
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
              {tShared("signUp")}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
