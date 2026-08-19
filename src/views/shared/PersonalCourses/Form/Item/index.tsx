"use client";
import { useTranslations } from "next-intl";
import { useWatch } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";

import useResumeEditRules from "@/hooks/useResumeEditRules";
import { PersonalCoursesItemProps } from "@/lib/constants/props/resume/personalCourses";
import { getInputEndDateRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";

import FormItem from "@/views/shared/FormItem";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import DatePickerField from "@/views/shared/DatePickerField";
import CheckboxField from "@/views/shared/CheckboxField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalCoursesFormItem = ({
  index,
  control,
  remove,
  getValues,
  resumeLocale,
}: PersonalCoursesItemProps) => {
  const t = useTranslations("PersonalCourses");
  const tShared = useTranslations("shared");
  const rules = useResumeEditRules();
  const isCurrent = useWatch({
    control,
    name: `courses.${index}.isCurrent`,
  });

  return (
    <Space align="baseline" className="card">
      <header className="card__header">
        <div className="d-flex justify-content-space-between">
          <Title className="mt-0 mr-8" level={3}>
            {t("cardTitle", { index: index + 1 })}
          </Title>
          <FormItem
            name={[index, "current"]}
            controlName={`courses.${index}.isCurrent`}
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
          disabled={isCurrent}
          Field={DatePickerField}
          size="large"
          locale={resumeLocale}
        />
      </section>
    </Space>
  );
};

export default PersonalCoursesFormItem;
