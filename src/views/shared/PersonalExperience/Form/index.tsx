"use client";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { REGEX_DIGITS } from "@/lib/constants/regex";
import {
  PersonalExperiencesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalExperiences";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getSectionTitleRules } from "@/utils/forms/validations/resume/sectionTitleValidation";
import { getInputTextRules } from "@/utils/forms/validations/resume/inputTextValidation";
import { getTextareaRules } from "@/utils/forms/validations/resume/textareaValidation";
import { getSelectRules } from "@/utils/forms/validations/resume/selectValidation";
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
  const { control, handleSubmit, register, formState, reset } =
    useForm<FieldType>({
      defaultValues,
      mode: "onChange",
    });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  const sectionTitleRules = useMemo(
    () => getSectionTitleRules(tShared),
    [tShared]
  );
  const inputTextRules = useMemo(() => getInputTextRules(tShared), [tShared]);
  const textareaRules = useMemo(() => getTextareaRules(tShared), [tShared]);
  const selectRules = useMemo(() => getSelectRules(tShared), [tShared]);

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

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

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
          label={tShared("form.sectionTitle.label")}
          placeholder={tShared("form.sectionTitle.placeholder")}
          rules={sectionTitleRules}
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
              rules={inputTextRules}
              Field={InputField}
              size="large"
            />
            <FormItem
              name={[index, "companyName"]}
              controlName={`experiences.${index}.companyName`}
              control={control}
              className="form__item--field"
              label={t("form.companyName.label")}
              placeholder={t("form.companyName.placeholder")}
              rules={inputTextRules}
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
              rules={inputTextRules}
              Field={InputField}
              size="large"
            />
            <FormItem
              name={[index, "employmentType"]}
              controlName={`experiences.${index}.employmentType`}
              control={control}
              className="form__item--field"
              label={t("form.employmentType.label")}
              placeholder={t("form.employmentType.placeholder")}
              rules={selectRules}
              Field={InputField}
              size="large"
            />
            <FormItem
              name={[index, "workFormat"]}
              controlName={`experiences.${index}.workFormat`}
              control={control}
              className="form__item--field"
              label={t("form.workFormat.label")}
              placeholder={t("form.workFormat.placeholder")}
              rules={selectRules}
              Field={InputField}
              size="large"
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
              rules={textareaRules}
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
              rules={inputTextRules}
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
