"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducation from "@/store/personalEducation/operations/updatePersonalEducation";
import {
  userIdSelector,
  personalEducationIdSelector,
} from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

type PersonalEducationFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  education: {
    institute: string;
    degree: string;
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
  const { control, handleSubmit } = useForm({
    defaultValues: {
      education: [
        {
          institute: "",
          degree: "",
          specialization: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });
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
      name="create-personal-education"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="education" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline">
            <FormItem
              name={[index, "institute"]}
              controlName={`education[${index}].institute`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.institute.label")}
              placeholder={t("form.institute.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.institute.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "degree"]}
              controlName={`education[${index}].degree`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.degree.label")}
              placeholder={t("form.degree.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.degree.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "specialization"]}
              controlName={`education[${index}].specialization`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.specialization.label")}
              placeholder={t("form.specialization.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.specialization.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`education[${index}].startDate`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.startDate.label")}
              placeholder={t("form.startDate.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.startDate.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "endDate"]}
              controlName={`education[${index}].endDate`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.endDate.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            {fields.length > 1 && (
              <MinusCircleOutlined onClick={() => remove(index)} />
            )}
          </Space>
        ))}
      </FormList>

      <FormItem
        className="form__buttons d-flex justify-content-end"
        name="buttons"
      >
        <Button
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalEducationForm;
