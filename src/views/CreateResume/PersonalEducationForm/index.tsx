"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

type FieldType = {
  education: {
    institute: string;
    degree: string;
    specialization: string;
    startDate: string;
    endDate: string;
  }[];
};

type PersonalEducationFormProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const PersonalEducationForm = ({
  onNext,
  onPrev,
}: PersonalEducationFormProps) => {
  const tShared = useTranslations("shared");
  const tCreateResume = useTranslations("CreateResume");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
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
    const data = await dispatch(createPersonalEducation(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
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
              label={tCreateResume("form.institute.label")}
              placeholder={tCreateResume("form.institute.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.institute.error"),
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
              label={tCreateResume("form.degree.label")}
              placeholder={tCreateResume("form.degree.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.degree.error"),
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
              label={tCreateResume("form.specialization.label")}
              placeholder={tCreateResume("form.specialization.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.specialization.error"),
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
              label={tCreateResume("form.startDate.label")}
              placeholder={tCreateResume("form.startDate.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.startDate.error"),
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
              label={tCreateResume("form.endDate.label")}
              placeholder={tCreateResume("form.endDate.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.endDate.error"),
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
          className="form__button mb-16"
          color="default"
          type="default"
          htmlType="button"
          size="large"
          onClick={onPrev}
        >
          {tShared("previous")}
        </Button>
        <Button
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {tShared("next")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalEducationForm;
