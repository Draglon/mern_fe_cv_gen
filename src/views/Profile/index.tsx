"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { FieldType } from "@/lib/constants/props/profile";
import { getProfileDefaultValues } from "@/lib/constants/profile";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  MIN_NIKE_NAME_LENGTH,
  MAX_NIKE_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from "@/lib/constants";
import { REGEX_NICK_NAME } from "@/lib/constants/regex";
import isPresent from "@/utils/isPresent";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import updateUserProfile from "@/store/auth/operations/updateUserProfile";
import { userSelector } from "@/store/auth/selectors";

import { Title } from "@/views/shared/antd/Typography";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";
import UploadFileField from "@/views/shared/UploadFileField";
import Button from "@/views/shared/antd/Button";

const Profile = () => {
  const tProfile = useTranslations("Profile");
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector) as {
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    userName: string;
  };
  const defaultValues = getProfileDefaultValues(user) as FieldType;
  const { control, handleSubmit, formState, register, reset } =
    useForm<FieldType>({
      defaultValues,
      mode: "onChange",
    });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = { values };
    await dispatch(updateUserProfile(params));
  });

  useEffect(() => {
    reset({
      avatarUrl: isPresent(user.avatarUrl) ? [user.avatarUrl] : [],
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      userName: user?.userName ?? "",
    });
  }, [user, reset]);

  return (
    <div className="page__wrapper">
      <div className="page__block">
        <header className="mb-32">
          <Title className="page__title mt-0">{tProfile("title")}</Title>
        </header>

        <Form
          name="editProfile"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <FormItem
            name="avatarUrl"
            controlName="avatarUrl"
            control={control}
            label={tProfile("form.avatarUrl.label")}
            Field={UploadFileField}
            size="large"
          />

          <FormItem
            name="userName"
            controlName="userName"
            control={control}
            label={tProfile("form.userName.label")}
            placeholder={tProfile("form.userName.placeholder")}
            register={register("userName", {
              required: tProfile("form.userName.errors.required"),
              pattern: {
                value: REGEX_NICK_NAME,
                message: tProfile("form.userName.errors.pattern"),
              },
              minLength: {
                value: MIN_NIKE_NAME_LENGTH,
                message: tProfile("form.userName.errors.minLength", {
                  minLength: MIN_NIKE_NAME_LENGTH,
                }),
              },
              maxLength: {
                value: MAX_NIKE_NAME_LENGTH,
                message: tProfile("form.userName.errors.maxLength", {
                  maxLength: MAX_NIKE_NAME_LENGTH,
                }),
              },
            })}
            errors={errors["userName"]}
            Field={InputField}
            size="large"
          />

          <FormItem
            className="form__item--field"
            name="firstName"
            controlName="firstName"
            control={control}
            label={tProfile("form.firstName.label")}
            placeholder={tProfile("form.firstName.placeholder")}
            register={register("firstName", {
              minLength: {
                value: MIN_NAME_LENGTH,
                message: tProfile("form.firstName.errors.minLength", {
                  minLength: MIN_NAME_LENGTH,
                }),
              },
              maxLength: {
                value: MAX_NAME_LENGTH,
                message: tProfile("form.firstName.errors.maxLength", {
                  maxLength: MAX_NAME_LENGTH,
                }),
              },
            })}
            errors={errors["firstName"]}
            Field={InputField}
            size="large"
          />

          <FormItem
            className="form__item--field"
            name="lastName"
            controlName="lastName"
            control={control}
            label={tProfile("form.lastName.label")}
            placeholder={tProfile("form.lastName.placeholder")}
            register={register("lastName", {
              minLength: {
                value: MIN_NAME_LENGTH,
                message: tProfile("form.lastName.errors.minLength", {
                  minLength: MIN_NAME_LENGTH,
                }),
              },
              maxLength: {
                value: MAX_NAME_LENGTH,
                message: tProfile("form.lastName.errors.maxLength", {
                  maxLength: MAX_NAME_LENGTH,
                }),
              },
            })}
            errors={errors["lastName"]}
            Field={InputField}
            size="large"
          />

          <FormItem name="buttons">
            <Button
              className="form__button"
              type="primary"
              htmlType="submit"
              size="large"
              disabled={isSubmitDisabled(formState)}
              loading={isSubmitLoading(formState)}
            >
              {tProfile("form.submitButton")}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
