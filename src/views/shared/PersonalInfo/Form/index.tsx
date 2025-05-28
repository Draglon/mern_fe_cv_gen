"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";

import { Locales } from "@/lib/constants/props/locales";
import { personalInfoByLocale } from "@/utils/personalInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import createPersonalInfo from "@/store/personalInfo/operations/createPersonalInfo";
import updatePersonalInfo from "@/store/personalInfo/operations/updatePersonalInfo";
import { userIdSelector, personalInfoIdSelector } from "@/store/auth/selectors";
import { personalInfoSelector } from "@/store/personalInfo/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import UploadFile from "@/views/shared/antd/UploadFile";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import Button from "@/views/shared/antd/Button";
import Divider from "@/views/shared/antd/Divider";

type PersonalInfoFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  sectionTitle: string;
  userUrl: any[];
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  linkedIn: string;
};

const PersonalInfoForm = ({ locale, isEdit }: PersonalInfoFormProps) => {
  const t = useTranslations("PersonalInfo");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalInfoId = useAppSelector(personalInfoIdSelector);
  const personalInfo = useAppSelector(personalInfoSelector);
  const defaultValues = personalInfoByLocale(personalInfo, locale as Locales);

  const { control, handleSubmit, formState, register } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
      userUrl: values?.userUrl ? values.userUrl : "",
    };

    const data =
      isEdit && personalInfoId
        ? await dispatch(updatePersonalInfo({ ...params, personalInfoId }))
        : await dispatch(createPersonalInfo(params));

    if (!data?.payload) {
      return alert("Не удалось обновить данные");
    }
  });

  return (
    <Form
      name={`create-personal-info-${locale}`}
      className="form form--personal-info"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <div className="form__wrapper">
        <div className="w-full">
          <FormItem
            className="form__item--field"
            name="sectionTitle"
            controlName="sectionTitle"
            control={control}
            label={t("form.sectionTitle.label")}
            placeholder={t("form.sectionTitle.placeholder")}
            register={register("sectionTitle", {
              required: {
                value: true,
                message: t("form.sectionTitle.errors.required"),
              },
            })}
            errors={errors["sectionTitle"]}
            Field={InputField}
            size="large"
          />
        </div>
        <div className="form__side-left">
          <FormItem
            name="userUrl"
            controlName="userUrl"
            control={control}
            label={t("form.userUrl.label")}
            fieldType="upload"
            Field={UploadFile}
            size="large"
          />
        </div>
        <div className="form__side-right">
          <div className="form__row">
            <FormItem
              className="form__item--field"
              name="firstName"
              controlName="firstName"
              control={control}
              label={t("form.firstName.label")}
              placeholder={t("form.firstName.placeholder")}
              register={register("firstName", {
                required: {
                  value: true,
                  message: t("form.firstName.errors.required"),
                },
                minLength: {
                  value: 3,
                  message: t("form.firstName.errors.minLength"),
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
              label={t("form.lastName.label")}
              placeholder={t("form.lastName.placeholder")}
              register={register("lastName", {
                required: {
                  value: true,
                  message: t("form.lastName.errors.required"),
                },
                minLength: {
                  value: 3,
                  message: t("form.lastName.errors.minLength"),
                },
              })}
              errors={errors["lastName"]}
              Field={InputField}
              size="large"
            />
          </div>
          <FormItem
            className="form__item--field"
            name="about"
            controlName="about"
            control={control}
            label={t("form.about.label")}
            placeholder={t("form.about.placeholder")}
            register={register("about", {
              required: {
                value: true,
                message: t("form.about.errors.required"),
              },
            })}
            errors={errors["about"]}
            fieldType="textarea"
            Field={TextAreaField}
            size="large"
          />

          <Divider />

          <FormItem
            className="form__item--field"
            name="email"
            type="email"
            controlName="email"
            control={control}
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            register={register("email", {
              required: {
                value: true,
                message: t("form.email.errors.required"),
              },
            })}
            errors={errors["email"]}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="form__item--field"
            name="address"
            controlName="address"
            control={control}
            label={t("form.address.label")}
            placeholder={t("form.address.placeholder")}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="form__item--field"
            name="phoneNumber"
            controlName="phoneNumber"
            control={control}
            label={t("form.phoneNumber.label")}
            placeholder={t("form.phoneNumber.placeholder")}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="form__item--field"
            name="birthday"
            controlName="birthday"
            control={control}
            label={t("form.birthday.label")}
            placeholder={t("form.birthday.placeholder")}
            Field={InputField}
            size="large"
          />

          <Divider />

          <FormItem
            className="form__item--field"
            name="linkedIn"
            controlName="linkedIn"
            control={control}
            label={t("form.linkedIn.label")}
            placeholder={t("form.linkedIn.placeholder")}
            Field={InputField}
            size="large"
          />
        </div>
      </div>

      <FormItem
        className="form__item--buttons d-flex justify-content-end"
        name="buttons"
      >
        <Button
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
          disabled={isSubmitDisabled(formState, false)}
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalInfoForm;
