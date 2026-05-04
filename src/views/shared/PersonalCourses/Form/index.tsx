"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import {
  PersonalCoursesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalCourses";
import { REGEX_STRING } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalCourses from "@/store/personalCourses/operations/createPersonalCourses";
import updatePersonalCourses from "@/store/personalCourses/operations/updatePersonalCourses";
import { personalCoursesByLocaleSelector } from "@/store/personalCourses/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import Divider from "@/views/shared/antd/Divider";

const PersonalCoursesForm = ({ locale, isEdit }: PersonalCoursesProps) => {
  const t = useTranslations("PersonalCourses");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalCoursesByLocaleSelector(state, locale)
  );
  const { control, handleSubmit, register, formState } = useForm<FieldType>({
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
    };

    if (isEdit) {
      await dispatch(updatePersonalCourses(params));
    } else {
      await dispatch(createPersonalCourses(params));
    }
  });

  return (
    <Form
      name={`create-personal-courses-${locale}`}
      className="form form--personal-courses"
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
      <FormList name="courses" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <FormItem
              name={[index, "course"]}
              controlName={`courses.${index}.course`}
              control={control}
              className="form__item--field"
              label={t("form.course.label")}
              placeholder={t("form.course.placeholder")}
              register={register(`courses.${index}.course`, {
                required: {
                  value: true,
                  message: t("form.course.errors.required"),
                },
              })}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "description"]}
              controlName={`courses.${index}.description`}
              control={control}
              className="form__item--field"
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
              register={register(`courses.${index}.description`, {
                required: {
                  value: true,
                  message: t("form.description.errors.required"),
                },
              })}
              size="large"
              Field={TextAreaField}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`courses.${index}.startDate`}
              control={control}
              className="form__item--field"
              label={t("form.startDate.label")}
              placeholder={t("form.startDate.placeholder")}
              register={register(`courses.${index}.startDate`, {
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
              controlName={`courses.${index}.endDate`}
              control={control}
              className="form__item--field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              register={register(`courses.${index}.endDate`, {
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

export default PersonalCoursesForm;
