"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalCourses from "@/store/personalCourses/operations/createPersonalCourses";
import updatePersonalCourses from "@/store/personalCourses/operations/updatePersonalCourses";
import {
  userIdSelector,
  personalCoursesIdSelector,
} from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

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
              label={t("form.course.label")}
              placeholder={t("form.course.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.course.error"),
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
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.description.error"),
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
              controlName={`courses[${index}].endDate`}
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

export default PersonalCoursesForm;
