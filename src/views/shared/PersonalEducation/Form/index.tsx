"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import {
  PersonalEducationProps,
  FieldType,
} from "@/lib/constants/props/resume/personalEducation";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getInputEndDateRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducation from "@/store/personalEducation/operations/updatePersonalEducation";
import { personalEducationByLocaleSelector } from "@/store/personalEducation/selectors";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import DatePickerField from "@/views/shared/DatePickerField";
import CheckboxField from "@/views/shared/CheckboxField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalEducationForm = ({
  resumeLocale,
  isEdit,
}: PersonalEducationProps) => {
  const t = useTranslations("PersonalEducation");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalEducationByLocaleSelector(state, resumeLocale)
  );
  const personalHobbiesId = useAppSelector(personalHobbiesIdSelector);
  const { control, handleSubmit, formState, reset, getValues, watch } =
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
          <Space key={field.id} align="baseline" className="card">
            <header className="card__header">
              <div className="d-flex justify-content-space-between">
                <Title className="mt-0 mr-8" level={3}>
                  {t("cardTitle", { index: index + 1 })}
                </Title>
                <FormItem
                  name={[index, "current"]}
                  controlName={`education.${index}.isCurrent`}
                  control={control}
                  className="form__item--field"
                  label={t("form.isCurrent.label")}
                  size="large"
                  Field={CheckboxField}
                />
              </div>
              <Button className="card__remove" onClick={() => remove(index)}>
                <DeleteOutlined className="card__remove-icon" />
              </Button>
            </header>
            <section className="card__section">
              <FormItem
                name={[index, "institute"]}
                controlName={`education.${index}.institute`}
                control={control}
                className="form__item--field"
                label={t("form.institute.label")}
                placeholder={t("form.institute.placeholder")}
                rules={rules.inputTextRules}
                Field={InputField}
                size="large"
              />
              <FormItem
                name={[index, "degree"]}
                controlName={`education.${index}.degree`}
                control={control}
                className="form__item--field"
                label={t("form.degree.label")}
                placeholder={t("form.degree.placeholder")}
                rules={rules.inputTextRules}
                Field={InputField}
                size="large"
              />
              <FormItem
                name={[index, "faculty"]}
                controlName={`education.${index}.faculty`}
                control={control}
                className="form__item--field"
                label={t("form.faculty.label")}
                placeholder={t("form.faculty.placeholder")}
                Field={InputField}
                size="large"
              />
              <FormItem
                name={[index, "specialization"]}
                controlName={`education.${index}.specialization`}
                control={control}
                className="form__item--field"
                label={t("form.specialization.label")}
                placeholder={t("form.specialization.placeholder")}
                Field={InputField}
                size="large"
              />
              <FormItem
                name={[index, "startDate"]}
                controlName={`education.${index}.startDate`}
                control={control}
                className="form__item--field"
                label={t("form.startDate.label")}
                placeholder={t("form.startDate.placeholder")}
                rules={rules.datePickerRules}
                Field={DatePickerField}
                size="large"
                locale={resumeLocale}
              />
              <FormItem
                name={[index, "endDate"]}
                controlName={`education.${index}.endDate`}
                control={control}
                className="form__item--field"
                label={t("form.endDate.label")}
                placeholder={t("form.endDate.placeholder")}
                rules={getInputEndDateRules({
                  tShared,
                  getValues,
                  startDatePath: `education.${index}.startDate`,
                  isCurrentPath: `education.${index}.isCurrent`,
                })}
                disabled={watch(`education.${index}.isCurrent`)}
                Field={DatePickerField}
                size="large"
                locale={resumeLocale}
              />
            </section>
          </Space>
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
