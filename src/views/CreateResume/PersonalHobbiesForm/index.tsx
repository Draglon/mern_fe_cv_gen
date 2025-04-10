"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalHobbies from "@/store/personalHobbies/operations/createPersonalHobbies";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

type FieldType = {
  hobbies: { hobby: string }[];
};

type PersonalHobbiesFormProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const PersonalHobbiesForm = ({ onNext, onPrev }: PersonalHobbiesFormProps) => {
  const tCreateResume = useTranslations("CreateResume");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const { control, handleSubmit } = useForm<FieldType>({
    defaultValues: {
      hobbies: [{ hobby: "" }],
    },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };
    const data = await dispatch(createPersonalHobbies(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
  });

  return (
    <Form
      name="create-personal-hobbies"
      className="form form--create-hobbies"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="hobbies" append={append}>
        {fields.map((field, index) => (
          <Space
            key={field.id}
            className="form__list-space mb-8 w-full"
            align="center"
          >
            <FormItem
              name={field.id}
              controlName={`hobbies[${index}].hobby`}
              control={control}
              fieldClassName="form__item-field"
              label={tCreateResume("form.hobby.label")}
              placeholder={tCreateResume("form.hobby.placeholder")}
              size="large"
              Field={Input}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.hobby.errors.required"),
                },
              ]}
            />
            {fields.length > 1 && (
              <MinusCircleOutlined
                className="form__item-button-remove"
                onClick={() => remove(index)}
              />
            )}
          </Space>
        ))}
      </FormList>

      <FormItem
        className="form__buttons d-flex justify-content-end"
        name="buttons"
      >
        <Button
          className="form__button mr-16"
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

export default PersonalHobbiesForm;
