"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, path } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import { coursesByLocale } from "@/utils/personalCourses";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalCourses from "@/store/personalCourses/operations/createPersonalCourses";
import updatePersonalCourses from "@/store/personalCourses/operations/updatePersonalCourses";
import {
  userIdSelector,
  personalCoursesIdSelector,
} from "@/store/auth/selectors";
import { personalCoursesSelector } from "@/store/personalCourses/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";

type PersonalCoursesFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  courses: {
    course: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
};

const PersonalCoursesForm = ({ locale, isEdit }: PersonalCoursesFormProps) => {
  const t = useTranslations("PersonalCourses");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalCoursesId = useAppSelector(personalCoursesIdSelector);
  const personalCourses = useAppSelector(personalCoursesSelector);
  const courses = coursesByLocale(personalCourses, locale as Locales);

  const { control, handleSubmit, register, formState } = useForm({
    values: {
      courses: !isEmpty(courses)
        ? courses
        : [
            {
              course: "",
              description: "",
              startDate: "",
              endDate: "",
            },
          ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };

    const data =
      isEdit && personalCoursesId
        ? await dispatch(
            updatePersonalCourses({ ...params, personalCoursesId })
          )
        : await dispatch(createPersonalCourses(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
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
      <FormList name="courses" append={append}>
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
              errors={path(["courses", index, "course"], errors)}
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
              errors={path(["courses", index, "description"], errors)}
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
              errors={path(["courses", index, "startDate"], errors)}
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
              errors={path(["courses", index, "endDate"], errors)}
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

      <FormItem
        className="form__item--buttons d-flex justify-content-end"
        name="buttons"
      >
        <Button
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
          disabled={isSubmitDisabled(formState, false)}
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalCoursesForm;
