"use client";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { FieldType } from "@/lib/constants/props/profile";
import { getProfileDefaultValues } from "@/utils/profile";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import isPresent from "@/utils/isPresent";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getUserNameRules } from "@/utils/forms/validations/userNameValidation";
import { getNameRules } from "@/utils/forms/validations/nameValidation";
import updateUserProfile from "@/store/auth/operations/updateUserProfile";
import { userSelector } from "@/store/auth/selectors";

import { Title } from "@/views/shared/antd/Typography";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";
import UploadFileField from "@/views/shared/UploadFileField";
import Button from "@/views/shared/antd/Button";

const Profile = () => {
  const tProfile = useTranslations("Profile");
  const tShared = useTranslations("shared");
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
  const userNameRules = useMemo(() => getUserNameRules(tShared), [tShared]);
  const nameRules = useMemo(() => getNameRules(tShared), [tShared]);

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
            label={tShared("form.avatarUrl.label")}
            Field={UploadFileField}
            size="large"
          />

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
            className="form__item--field"
            name="firstName"
            controlName="firstName"
            control={control}
            label={tShared("form.firstName.label")}
            placeholder={tShared("form.firstName.placeholder")}
            rules={nameRules}
            errors={errors["firstName"]}
            Field={InputField}
            size="large"
          />

          <FormItem
            className="form__item--field"
            name="lastName"
            controlName="lastName"
            control={control}
            label={tShared("form.lastName.label")}
            placeholder={tShared("form.lastName.placeholder")}
            rules={nameRules}
            errors={errors["lastName"]}
            Field={InputField}
            size="large"
          />

          <Button
            className="form__button"
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isSubmitDisabled(formState)}
            loading={isSubmitLoading(formState)}
          >
            {tShared("form.submitButton")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
