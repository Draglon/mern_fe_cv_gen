"use client";
import { useTranslations } from "next-intl";
import { useWatch } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";

import useResumeEditRules from "@/hooks/useResumeEditRules";
import { EMPLOYMENT_TYPES, WORK_FORMATS } from "@/lib/constants/experiences";
import { PersonalExperienceItemProps } from "@/lib/constants/props/resume/personalExperiences";
import { getInputEndDateRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";

import FormItem from "@/views/shared/FormItem";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import DatePickerField from "@/views/shared/DatePickerField";
import CheckboxField from "@/views/shared/CheckboxField";
import TextAreaField from "@/views/shared/TextAreaField";
import SelectField from "@/views/shared/SelectField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalExperienceFormItem = ({
  index,
  control,
  remove,
  getValues,
  resumeLocale,
}: PersonalExperienceItemProps) => {
  const t = useTranslations("PersonalEducation");
  const tShared = useTranslations("shared");
  const rules = useResumeEditRules();
  const isCurrent = useWatch({
    control,
    name: `experiences.${index}.isCurrent`,
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
            controlName={`experiences.${index}.isCurrent`}
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
          name={[index, "companyName"]}
          controlName={`experiences.${index}.companyName`}
          control={control}
          className="form__item--field"
          label={t("form.companyName.label")}
          placeholder={t("form.companyName.placeholder")}
          rules={rules.inputTextRules}
          Field={InputField}
          size="large"
        />
        <FormItem
          name={[index, "position"]}
          controlName={`experiences.${index}.position`}
          control={control}
          className="form__item--field"
          label={t("form.position.label")}
          placeholder={t("form.position.placeholder")}
          rules={rules.inputTextRules}
          Field={InputField}
          size="large"
        />
        <FormItem
          name={[index, "location"]}
          controlName={`experiences.${index}.location`}
          control={control}
          className="form__item--field"
          label={t("form.location.label")}
          placeholder={t("form.location.placeholder")}
          rules={rules.inputTextRules}
          Field={InputField}
          size="large"
        />
        <FormItem
          className="form__item--field"
          name={[index, "employmentType"]}
          controlName={`experiences.${index}.employmentType`}
          control={control}
          label={t("form.employmentType.label")}
          placeholder={t("form.employmentType.placeholder")}
          Field={SelectField}
          options={EMPLOYMENT_TYPES.map((employmentType) => ({
            label: t(
              `form.employmentType.options.${employmentType}.${resumeLocale}`
            ),
            value: employmentType,
          }))}
          size="large"
        />
        <FormItem
          className="form__item--field"
          name={[index, "workFormat"]}
          controlName={`experiences.${index}.workFormat`}
          control={control}
          label={t("form.workFormat.label")}
          placeholder={t("form.workFormat.placeholder")}
          Field={SelectField}
          options={WORK_FORMATS.map((workFormat) => ({
            label: t(`form.workFormat.options.${workFormat}.${resumeLocale}`),
            value: workFormat,
          }))}
          size="large"
        />
        <FormItem
          name={[index, "startDate"]}
          controlName={`experiences.${index}.startDate`}
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
          controlName={`experiences.${index}.endDate`}
          control={control}
          className="form__item--field"
          label={t("form.endDate.label")}
          placeholder={t("form.endDate.placeholder")}
          rules={getInputEndDateRules({
            tShared,
            getValues,
            startDatePath: `experiences.${index}.startDate`,
            isCurrentPath: `experiences.${index}.isCurrent`,
          })}
          disabled={isCurrent}
          Field={DatePickerField}
          size="large"
          locale={resumeLocale}
        />
        <FormItem
          name={[index, "description"]}
          controlName={`experiences.${index}.description`}
          control={control}
          className="form__item--field"
          label={t("form.description.label")}
          placeholder={t("form.description.placeholder")}
          rules={rules.textareaRules}
          Field={TextAreaField}
          size="large"
        />
        <FormItem
          name={[index, "skills"]}
          controlName={`experiences.${index}.skills`}
          control={control}
          className="form__item--field"
          label={t("form.skills.label")}
          placeholder={t("form.skills.placeholder")}
          Field={SelectField}
          size="large"
          mode="tags"
        />
      </section>
    </Space>
  );
};

export default PersonalExperienceFormItem;
