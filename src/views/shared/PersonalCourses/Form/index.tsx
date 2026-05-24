"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import {
  PersonalCoursesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalCourses";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getInputEndDateRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalCourses from "@/store/personalCourses/operations/createPersonalCourses";
import updatePersonalCourses from "@/store/personalCourses/operations/updatePersonalCourses";
import { personalCoursesByLocaleSelector } from "@/store/personalCourses/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import DatePickerField from "@/views/shared/DatePickerField";
import CheckboxField from "@/views/shared/CheckboxField";

const PersonalCoursesForm = ({
  resumeLocale,
  isEdit,
}: PersonalCoursesProps) => {
  const t = useTranslations("PersonalCourses");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalCoursesByLocaleSelector(state, resumeLocale)
  );
  const { control, handleSubmit, formState, reset, getValues, watch } =
    useForm<FieldType>({
      defaultValues,
      mode: "onChange",
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
      resumeLocale,
    };

    if (isEdit) {
      await dispatch(updatePersonalCourses(params));
    } else {
      await dispatch(createPersonalCourses(params));
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-courses-${resumeLocale}`}
      className="form form--personal-courses"
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
      <FormList name="courses" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <header>
              <FormItem
                name={[index, "current"]}
                controlName={`courses.${index}.isCurrent`}
                control={control}
                className="form__item--field"
                label={t("form.isCurrent.label")}
                size="large"
                Field={CheckboxField}
              />
              {fields.length > 1 && (
                <MinusCircleOutlined
                  className="form__item--button-remove"
                  onClick={() => remove(index)}
                />
              )}
            </header>
            <FormItem
              name={[index, "course"]}
              controlName={`courses.${index}.course`}
              control={control}
              className="form__item--field"
              label={t("form.course.label")}
              placeholder={t("form.course.placeholder")}
              rules={rules.inputTextRules}
              Field={InputField}
              size="large"
            />
            <FormItem
              name={[index, "description"]}
              controlName={`courses.${index}.description`}
              control={control}
              className="form__item--field"
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
              rules={rules.textareaRules}
              Field={TextAreaField}
              size="large"
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`courses.${index}.startDate`}
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
              controlName={`courses.${index}.endDate`}
              control={control}
              className="form__item--field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              rules={getInputEndDateRules({
                tShared,
                getValues,
                startDatePath: `courses.${index}.startDate`,
                isCurrentPath: `courses.${index}.isCurrent`,
              })}
              disabled={watch(`courses.${index}.isCurrent`)}
              Field={DatePickerField}
              size="large"
              locale={resumeLocale}
            />
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

export default PersonalCoursesForm;
