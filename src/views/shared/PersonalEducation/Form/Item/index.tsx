"use client";
import { useTranslations } from "next-intl";
import { useWatch } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";

import useResumeEditRules from "@/hooks/useResumeEditRules";
import { PersonalEducationItemProps } from "@/lib/constants/props/resume/personalEducation";
import { getInputEndDateRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";

import FormItem from "@/views/shared/FormItem";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import DatePickerField from "@/views/shared/DatePickerField";
import CheckboxField from "@/views/shared/CheckboxField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalEducationFormItem = ({
  index,
  control,
  remove,
  getValues,
  resumeLocale,
}: PersonalEducationItemProps) => {
  const t = useTranslations("PersonalEducation");
  const tShared = useTranslations("shared");
  const rules = useResumeEditRules();
  const isCurrent = useWatch({
    control,
    name: `education.${index}.isCurrent`,
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
          disabled={isCurrent}
          Field={DatePickerField}
          size="large"
          locale={resumeLocale}
        />
      </section>
    </Space>
  );
};

export default PersonalEducationFormItem;
