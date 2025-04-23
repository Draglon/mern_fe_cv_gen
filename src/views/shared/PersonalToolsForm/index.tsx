"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty } from "ramda";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { Locales } from "@/lib/constants/props/locales";
import { toolsByLocale } from "@/utils/personalTools";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalTools from "@/store/personalTools/operations/createPersonalTools";
import updatePersonalTools from "@/store/personalTools/operations/updatePersonalTools";
import { personalToolsSelector } from "@/store/personalTools/selectors";
import {
  userIdSelector,
  personalToolsIdSelector,
} from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";
import Checkbox from "@/views/shared/antd/Checkbox";

type PersonalToolsFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  tools: {
    tool: string;
    level: string;
    visible: boolean;
  }[];
};

const PersonalToolsForm = ({ locale, isEdit }: PersonalToolsFormProps) => {
  const t = useTranslations("PersonalTools");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalToolsId = useAppSelector(personalToolsIdSelector);
  const personalTools = useAppSelector(personalToolsSelector);
  const tools = toolsByLocale(personalTools, locale as Locales);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      tools: !isEmpty(tools)
        ? tools
        : [
            {
              tool: "",
              level: "",
              visible: true,
            },
          ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };

    const data =
      isEdit && personalToolsId
        ? await dispatch(updatePersonalTools({ ...params, personalToolsId }))
        : await dispatch(createPersonalTools(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    redirect({ href: resumeRoute, locale });
  });

  return (
    <Form
      name="create-personal-tools"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="tools" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline">
            <FormItem
              name={[index, "tool"]}
              controlName={`tools[${index}].tool`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.tool.label")}
              placeholder={t("form.tool.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.tool.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "level"]}
              controlName={`tools[${index}].level`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.level.label")}
              placeholder={t("form.level.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.level.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "visible"]}
              controlName={`tools[${index}].visible`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.visible.label")}
              size="large"
              fieldType="checkbox"
              Field={Checkbox}
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

export default PersonalToolsForm;
