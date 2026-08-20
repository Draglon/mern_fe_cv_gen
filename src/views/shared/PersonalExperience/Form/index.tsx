"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "antd";

import {
  PersonalExperiencesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalExperiences";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalExperience from "@/store/personalExperience/operations/createPersonalExperience";
import updatePersonalExperience from "@/store/personalExperience/operations/updatePersonalExperience";
import { personalExperienceByLocaleSelector } from "@/store/personalExperience/selectors";
import { personalExperiencesIdSelector } from "@/store/auth/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import InputNumberField from "@/views/shared/InputNumberField";

import PersonalExperienceFormItem from "./Item";

const PersonalExperienceForm = ({
  resumeLocale,
  isEdit,
}: PersonalExperiencesProps) => {
  const t = useTranslations("PersonalExperience");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalExperienceByLocaleSelector(state, resumeLocale)
  );
  const personalExperiencesId = useAppSelector(personalExperiencesIdSelector);
  const { control, handleSubmit, formState, reset, getValues } =
    useForm<FieldType>({
      defaultValues,
      mode: "onChange",
    });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
      resumeLocale,
    };

    if (isEdit && personalExperiencesId) {
      await dispatch(updatePersonalExperience(params));
    } else {
      await dispatch(createPersonalExperience(params));
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-experience-${resumeLocale}`}
      className="form form--personal-experience"
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
        <FormItem
          className="form__item--field"
          name="recentPositionsCount"
          controlName="recentPositionsCount"
          control={control}
          label={t("form.recentPositionsCount.label")}
          placeholder={t("form.recentPositionsCount.placeholder")}
          rules={rules.inputNumberRecentPositionsCountRules}
          Field={InputNumberField}
          size="large"
        />
      </header>
      <FormList name="experiences" prepend={prepend} fieldValues={fields}>
        {fields.map((field, index) => (
          <PersonalExperienceFormItem
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

export default PersonalExperienceForm;
