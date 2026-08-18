"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "antd";

import {
  PersonalEducationProps,
  FieldType,
} from "@/lib/constants/props/resume/personalEducation";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducation from "@/store/personalEducation/operations/updatePersonalEducation";
import { personalEducationByLocaleSelector } from "@/store/personalEducation/selectors";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";

import PersonalEducationFormItem from "./Item";

const PersonalEducationForm = ({
  resumeLocale,
  isEdit,
}: PersonalEducationProps) => {
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalEducationByLocaleSelector(state, resumeLocale)
  );
  const personalHobbiesId = useAppSelector(personalHobbiesIdSelector);
  const { control, handleSubmit, formState, reset, getValues } =
    useForm<FieldType>({
      defaultValues,
      mode: "onChange",
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
      resumeLocale,
    };

    if (isEdit && personalHobbiesId) {
      await dispatch(updatePersonalEducation(params));
    } else {
      await dispatch(createPersonalEducation(params));
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-education-${resumeLocale}`}
      className="form form--personal-education"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <header className="form__header">
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
      </header>

      <FormList name="education" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <PersonalEducationFormItem
            key={field.id}
            index={index}
            control={control}
            remove={remove}
            getValues={getValues}
            resumeLocale={resumeLocale}
          />
        ))}
      </FormList>

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

export default PersonalEducationForm;
