"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { LANGUAGE_LEVEL } from "@/lib/constants/languages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalLanguages from "@/store/personalLanguages/operations/createPersonalLanguages";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";
import Select from "@/views/shared/antd/Select";
type FieldType = {
  languages: { language: string; level: string }[];
};

type PersonalLanguagesFormProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const PersonalLanguagesForm = ({
  onNext,
  onPrev,
}: PersonalLanguagesFormProps) => {
  const tShared = useTranslations("shared");
  const tCreateResume = useTranslations("CreateResume");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      languages: [{ language: "", level: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };
    const data = await dispatch(createPersonalLanguages(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
  });

  return (
    <Form
      name="create-personal-languages"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="languages" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline">
            <FormItem
              name={[index, "language"]}
              controlName={`languages[${index}].language`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.language.label")}
              placeholder={tCreateResume("form.language.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.language.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "level"]}
              controlName={`languages[${index}].level`}
              control={control}
              label={tCreateResume("form.languageLevel.label")}
              placeholder={tCreateResume("form.languageLevel.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.languageLevel.error"),
                },
              ]}
              Field={Select}
              options={LANGUAGE_LEVEL.map((level) => ({
                label: tCreateResume(
                  `form.languageLevel.levelOptions.${level}`
                ),
                value: level,
              }))}
              size="large"
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

export default PersonalLanguagesForm;
