"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, path } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import { educationByLocale } from "@/utils/personalEducation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducation from "@/store/personalEducation/operations/updatePersonalEducation";
import {
  userIdSelector,
  personalEducationIdSelector,
} from "@/store/auth/selectors";
import { personalEducationSelector } from "@/store/personalEducation/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";

type PersonalEducationFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  education: {
    institute: string;
    degree: string;
    faculty: string;
    specialization: string;
    startDate: string;
    endDate: string;
  }[];
};

const PersonalEducationForm = ({
  locale,
  isEdit,
}: PersonalEducationFormProps) => {
  const t = useTranslations("PersonalEducation");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalEducationId = useAppSelector(personalEducationIdSelector);
  const personalEducation = useAppSelector(personalEducationSelector);
  const education = educationByLocale(personalEducation, locale as Locales);

  const { control, handleSubmit, register, formState } = useForm({
    values: {
      education: !isEmpty(education)
        ? education
        : [
            {
              institute: "",
              degree: "",
              faculty: "",
              specialization: "",
              startDate: "",
              endDate: "",
            },
          ],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };

    const data =
      isEdit && personalEducationId
        ? await dispatch(
            updatePersonalEducation({ ...params, personalEducationId })
          )
        : await dispatch(createPersonalEducation(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
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
      <FormList name="education" append={append}>
        {fields.map((field, index) => (
          <Space
            key={field.id}
            align="baseline"
            className="form__list-space mb-8 w-full"
          >
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
              errors={path(["education", index, "institute"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "degree"]}
              controlName={`education[${index}].degree`}
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
              errors={path(["education", index, "degree"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "faculty"]}
              controlName={`education[${index}].faculty`}
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
              errors={path(["education", index, "faculty"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "specialization"]}
              controlName={`education[${index}].specialization`}
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
              errors={path(["education", index, "specialization"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`education[${index}].startDate`}
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
              errors={path(["education", index, "startDate"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "endDate"]}
              controlName={`education[${index}].endDate`}
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
              errors={path(["education", index, "endDate"], errors)}
              size="large"
              Field={InputField}
            />
            {fields.length > 1 && (
              <MinusCircleOutlined onClick={() => remove(index)} />
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

export default PersonalEducationForm;
