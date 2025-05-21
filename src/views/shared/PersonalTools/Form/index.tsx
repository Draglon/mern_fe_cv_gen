"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, path } from "ramda";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { Locales } from "@/lib/constants/props/locales";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
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
import InputField from "@/views/shared/InputField";
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

  const { control, handleSubmit, register, formState } = useForm({
    values: {
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
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });
  const { errors } = formState;

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
      name={`create-personal-tools-${locale}`}
      className="form form--personal-tools"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="tools" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <FormItem
              name={[index, "tool"]}
              controlName={`tools.${index}.tool`}
              control={control}
              className="form__item--field"
              label={t("form.tool.label")}
              placeholder={t("form.tool.placeholder")}
              size="large"
              Field={InputField}
              register={register(`tools.${index}.tool`, {
                required: {
                  value: true,
                  message: t("form.tool.errors.required"),
                },
              })}
              errors={path(["tools", index, "tool"], errors)}
            />
            <FormItem
              name={[index, "level"]}
              controlName={`tools.${index}.level`}
              control={control}
              className="form__item--field"
              label={t("form.level.label")}
              placeholder={t("form.level.placeholder")}
              register={register(`tools.${index}.level`, {
                required: {
                  value: true,
                  message: t("form.level.errors.required"),
                },
              })}
              errors={path(["tools", index, "level"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "visible"]}
              controlName={`tools.${index}.visible`}
              control={control}
              className="form__item--field"
              label={t("form.visible.label")}
              size="large"
              fieldType="checkbox"
              Field={Checkbox}
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

export default PersonalToolsForm;
