"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalCourses from "@/store/personalCourses/operations/createPersonalCourses";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

type FieldType = {
  courses: {
    course: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
};

type PersonalCoursesFormProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const PersonalCoursesForm = ({ onNext, onPrev }: PersonalCoursesFormProps) => {
  const tShared = useTranslations("shared");
  const tCreateResume = useTranslations("CreateResume");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      courses: [
        {
          course: "",
          description: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });
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
    const data = await dispatch(createPersonalCourses(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
  });

  return (
    <Form
      name="create-personal-courses"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="courses" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline">
            <FormItem
              name={[index, "course"]}
              controlName={`courses[${index}].course`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.course.label")}
              placeholder={tCreateResume("form.course.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.course.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "description"]}
              controlName={`courses[${index}].description`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.description.label")}
              placeholder={tCreateResume("form.description.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.description.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`courses[${index}].startDate`}
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
              controlName={`courses[${index}].endDate`}
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

export default PersonalCoursesForm;
