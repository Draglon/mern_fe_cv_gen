"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { LANGUAGE_LEVEL } from "@/lib/constants/languages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalLanguages from "@/store/personalLanguages/operations/createPersonalLanguages";
import updatePersonalLanguages from "@/store/personalLanguages/operations/updatePersonalLanguages";
import {
  userIdSelector,
  personalLanguagesIdSelector,
} from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";
import Select from "@/views/shared/antd/Select";

type PersonalLanguagesFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  languages: { language: string; level: string }[];
};

const PersonalLanguagesForm = ({
  locale,
  isEdit,
}: PersonalLanguagesFormProps) => {
  const t = useTranslations("PersonalLanguages");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalLanguagesId = useAppSelector(personalLanguagesIdSelector);
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

    const data =
      isEdit && personalLanguagesId
        ? await dispatch(
            updatePersonalLanguages({ ...params, personalLanguagesId })
          )
        : await dispatch(createPersonalLanguages(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }
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
              label={t("form.language.label")}
              placeholder={t("form.language.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.language.errors.required"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "level"]}
              controlName={`languages[${index}].level`}
              control={control}
              label={t("form.languageLevel.label")}
              placeholder={t("form.languageLevel.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.languageLevel.errors.required"),
                },
              ]}
              Field={Select}
              options={LANGUAGE_LEVEL.map((level) => ({
                label: t(`form.languageLevel.levelOptions.${level}`),
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

export default PersonalLanguagesForm;
