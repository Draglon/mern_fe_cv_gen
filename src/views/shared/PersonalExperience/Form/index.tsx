"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { REGEX_DIGITS, REGEX_STRING } from "@/lib/constants/regex";
import {
  PersonalExperiencesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalExperiences";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalExperience from "@/store/personalExperience/operations/createPersonalExperience";
import updatePersonalExperience from "@/store/personalExperience/operations/updatePersonalExperience";
import { personalExperienceByLocaleSelector } from "@/store/personalExperience/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import SelectField from "@/views/shared/SelectField";
import Divider from "@/views/shared/antd/Divider";

const PersonalExperienceForm = ({
  locale,
  isEdit,
}: PersonalExperiencesProps) => {
  const t = useTranslations("PersonalExperience");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalExperienceByLocaleSelector(state, locale)
  );
  const { control, handleSubmit, register, formState } = useForm<FieldType>({
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
    };

    if (isEdit) {
      await dispatch(updatePersonalExperience(params));
    } else {
      await dispatch(createPersonalExperience(params));
    }
  });

  return (
    <Form
      name={`create-personal-experience-${locale}`}
      className="form form--personal-experience"
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
        <FormItem
          className="form__item--field"
          name="recentPositionsCount"
          controlName="recentPositionsCount"
          control={control}
          label={t("form.recentPositionsCount.label")}
          placeholder={t("form.recentPositionsCount.placeholder")}
          register={register("recentPositionsCount", {
            pattern: {
              value: REGEX_DIGITS,
              message: t("form.recentPositionsCount.errors.required"),
            },
          })}
          Field={InputField}
          size="large"
        />
        <Divider />
      </div>
      <FormList name="experience" prepend={prepend} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <FormItem
              name={[index, "position"]}
              controlName={`experiences.${index}.position`}
              control={control}
              className="form__item--field"
              label={t("form.position.label")}
              placeholder={t("form.position.placeholder")}
              register={register(`experiences.${index}.position`, {
                required: {
                  value: true,
                  message: t("form.position.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "companyName"]}
              controlName={`experiences.${index}.companyName`}
              control={control}
              className="form__item--field"
              label={t("form.companyName.label")}
              placeholder={t("form.companyName.placeholder")}
              register={register(`experiences.${index}.companyName`, {
                required: {
                  value: true,
                  message: t("form.companyName.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "location"]}
              controlName={`experiences.${index}.location`}
              control={control}
              className="form__item--field"
              label={t("form.location.label")}
              placeholder={t("form.location.placeholder")}
              register={register(`experiences.${index}.location`, {
                required: {
                  value: true,
                  message: t("form.location.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "employmentType"]}
              controlName={`experiences.${index}.employmentType`}
              control={control}
              className="form__item--field"
              label={t("form.employmentType.label")}
              placeholder={t("form.employmentType.placeholder")}
              register={register(`experiences.${index}.employmentType`, {
                required: {
                  value: true,
                  message: t("form.employmentType.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "workFormat"]}
              controlName={`experiences.${index}.workFormat`}
              control={control}
              className="form__item--field"
              label={t("form.workFormat.label")}
              placeholder={t("form.workFormat.placeholder")}
              register={register(`experiences.${index}.workFormat`, {
                required: {
                  value: true,
                  message: t("form.workFormat.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`experiences.${index}.startDate`}
              control={control}
              className="form__item--field"
              label={t("form.startDate.label")}
              placeholder={t("form.startDate.placeholder")}
              register={register(`experiences.${index}.startDate`, {
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
              controlName={`experiences.${index}.endDate`}
              control={control}
              className="form__item--field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              register={register(`experiences.${index}.endDate`, {
                required: {
                  value: true,
                  message: t("form.endDate.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "description"]}
              controlName={`experiences.${index}.description`}
              control={control}
              className="form__item--field"
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
              register={register(`experiences.${index}.description`, {
                required: {
                  value: true,
                  message: t("form.description.errors.required"),
                },
              })}
              size="large"
              Field={TextAreaField}
            />
            <FormItem
              name={[index, "skills"]}
              controlName={`experiences.${index}.skills`}
              control={control}
              className="form__item--field"
              label={t("form.skills.label")}
              placeholder={t("form.skills.placeholder")}
              register={register(`experiences.${index}.skills`, {
                required: {
                  value: true,
                  message: t("form.skills.errors.required"),
                },
              })}
              mode="tags"
              size="large"
              Field={SelectField}
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

export default PersonalExperienceForm;
