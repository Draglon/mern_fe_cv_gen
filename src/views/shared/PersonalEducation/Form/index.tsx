"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import {
  PersonalEducationProps,
  FieldType,
} from "@/lib/constants/props/resume/personalEducation";
import { REGEX_STRING } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducation from "@/store/personalEducation/operations/updatePersonalEducation";
import { personalEducationByLocaleSelector } from "@/store/personalEducation/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import Divider from "@/views/shared/antd/Divider";

const PersonalEducationForm = ({ locale, isEdit }: PersonalEducationProps) => {
  const t = useTranslations("PersonalEducation");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalEducationByLocaleSelector(state, locale)
  );
  const { control, handleSubmit, register, formState } = useForm<FieldType>({
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
    };

    if (isEdit) {
      await dispatch(updatePersonalEducation(params));
    } else {
      await dispatch(createPersonalEducation(params));
    }
  });

  return (
    <Form
      name={`create-personal-education-${locale}`}
      className="form form--personal-education"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <div className="w-full mb-32">
        <FormItem
          className="form__item--field"
          name="sectionTitle"
          controlName="sectionTitle"
          control={control}
          label={t("form.sectionTitle.label")}
          placeholder={t("form.sectionTitle.placeholder")}
          register={register("sectionTitle", {
            pattern: {
              value: REGEX_STRING,
              message: t("form.sectionTitle.errors.required"),
            },
          })}
          Field={InputField}
          size="large"
        />
        <Divider />
      </div>
      <FormList name="education" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <FormItem
              name={[index, "institute"]}
              controlName={`education.${index}.institute`}
              control={control}
              className="form__item--field"
              label={t("form.institute.label")}
              placeholder={t("form.institute.placeholder")}
              register={register(`education.${index}.institute`, {
                required: {
                  value: true,
                  message: t("form.institute.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "degree"]}
              controlName={`education.${index}.degree`}
              control={control}
              className="form__item--field"
              label={t("form.degree.label")}
              placeholder={t("form.degree.placeholder")}
              register={register(`education.${index}.degree`, {
                required: {
                  value: true,
                  message: t("form.degree.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "faculty"]}
              controlName={`education.${index}.faculty`}
              control={control}
              className="form__item--field"
              label={t("form.faculty.label")}
              placeholder={t("form.faculty.placeholder")}
              register={register(`education.${index}.faculty`, {
                required: {
                  value: true,
                  message: t("form.faculty.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "specialization"]}
              controlName={`education.${index}.specialization`}
              control={control}
              className="form__item--field"
              label={t("form.specialization.label")}
              placeholder={t("form.specialization.placeholder")}
              register={register(`education.${index}.specialization`, {
                required: {
                  value: true,
                  message: t("form.specialization.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`education.${index}.startDate`}
              control={control}
              className="form__item--field"
              label={t("form.startDate.label")}
              placeholder={t("form.startDate.placeholder")}
              register={register(`education.${index}.startDate`, {
                required: {
                  value: true,
                  message: t("form.startDate.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "endDate"]}
              controlName={`education.${index}.endDate`}
              control={control}
              className="form__item--field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              register={register(`education.${index}.endDate`, {
                required: {
                  value: true,
                  message: t("form.endDate.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            {fields.length > 1 && (
              <MinusCircleOutlined
                className="form__item--button-remove"
                onClick={() => remove(index)}
              />
            )}
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
