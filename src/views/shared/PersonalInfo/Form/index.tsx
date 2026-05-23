"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";

import {
  PersonalInfoProps,
  FieldType,
} from "@/lib/constants/props/resume/personalInfo";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalInfo from "@/store/personalInfo/operations/createPersonalInfo";
import updatePersonalInfo from "@/store/personalInfo/operations/updatePersonalInfo";
import { personalInfoByLocaleSelector } from "@/store/personalInfo/selectors";

import FormItem from "@/views/shared/FormItem";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import UploadFileField from "@/views/shared/UploadFileField";
import PhoneNumberField from "@/views/shared/PhoneNumberField";
import DatePickerField from "@/views/shared/DatePickerField";
import Button from "@/views/shared/antd/Button";
import Divider from "@/views/shared/antd/Divider";

const PersonalInfoForm = ({ resumeLocale, isEdit }: PersonalInfoProps) => {
  const t = useTranslations("PersonalInfo");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalInfoByLocaleSelector(state, resumeLocale)
  );
  const { control, handleSubmit, formState, reset } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
      resumeLocale,
    };

    if (isEdit) {
      await dispatch(updatePersonalInfo(params));
    } else {
      await dispatch(createPersonalInfo(params));
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-info-${resumeLocale}`}
      className="form form--personal-info"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <div className="form__wrapper">
        <div className="w-full mb-32">
          <FormItem
            className="form__item--field"
            name="sectionTitle"
            controlName="sectionTitle"
            control={control}
            label={tShared("form.sectionTitle.label")}
            placeholder={tShared("form.sectionTitle.placeholder")}
            rules={rules.sectionTitleRules}
            Field={InputField}
            size="large"
          />
          <Divider />
        </div>
        <div className="form__side-left">
          <FormItem
            name="userUrl"
            controlName="userUrl"
            control={control}
            label={t("form.userUrl.label")}
            Field={UploadFileField}
            size="large"
          />
          <div className="form__row">
            <FormItem
              className="form__item--field"
              name="firstName"
              controlName="firstName"
              control={control}
              label={t("form.firstName.label")}
              placeholder={t("form.firstName.placeholder")}
              rules={rules.inputTextNameRules}
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
              rules={rules.inputTextNameRules}
              Field={InputField}
              size="large"
            />
          </div>
          <FormItem
            className="form__item--field"
            name="aboutMe"
            controlName="aboutMe"
            control={control}
            label={t("form.aboutMe.label")}
            placeholder={t("form.aboutMe.placeholder")}
            rules={rules.textareaRules}
            Field={TextAreaField}
            size="large"
          />
        </div>
        <div className="form__side-right">
          <Divider />
          <FormItem
            className="form__item--field"
            name="email"
            type="email"
            controlName="email"
            control={control}
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            rules={rules.emailRules}
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
            Field={PhoneNumberField}
            size="large"
            defaultCountry="UA"
          />
          <FormItem
            className="form__item--field"
            name="telegram"
            controlName="telegram"
            control={control}
            label={t("form.telegram.label")}
            placeholder={t("form.telegram.placeholder")}
            rules={rules.inputTelegramRules}
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
            rules={rules.datePickerRules}
            Field={DatePickerField}
            size="large"
            locale={resumeLocale}
          />

          <Divider />

          <FormItem
            className="form__item--field"
            name="linkedIn"
            controlName="linkedIn"
            control={control}
            label={t("form.linkedIn.label")}
            placeholder={t("form.linkedIn.placeholder")}
            rules={rules.inputLinkRules}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="form__item--field"
            name="portfolio"
            controlName="portfolio"
            control={control}
            label={t("form.portfolio.label")}
            placeholder={t("form.portfolio.placeholder")}
            rules={rules.inputLinkRules}
            Field={InputField}
            size="large"
          />
        </div>
      </div>

      <Button
        className="form__button"
        type="primary"
        htmlType="submit"
        size="large"
        disabled={isSubmitDisabled(formState)}
        loading={isSubmitLoading(formState)}
      >
        {tShared("save")}
      </Button>
    </Form>
  );
};

export default PersonalInfoForm;
