"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import { Locales } from "@/lib/constants/props/locales";
import { REGEX_STRING } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalTools from "@/store/personalTools/operations/createPersonalTools";
import updatePersonalTools from "@/store/personalTools/operations/updatePersonalTools";
import { personalToolsByLocaleSelector } from "@/store/personalTools/selectors";
import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import Checkbox from "@/views/shared/antd/Checkbox";
import Divider from "@/views/shared/antd/Divider";

type PersonalToolsFormProps = {
  locale: Locales;
  isEdit?: boolean;
};

type FieldType = {
  sectionTitle?: string;
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
  const defaultValues = useAppSelector((state) =>
    personalToolsByLocaleSelector(state, locale)
  );

  const { control, handleSubmit, register, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
    };

    const data = isEdit
      ? await dispatch(updatePersonalTools(params))
      : await dispatch(createPersonalTools(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    if (!isEdit) {
      redirect({ href: resumeRoute, locale });
    }
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
      <div className="w-full mb-32">
        <FormItem
          className="form__item--field"
          name="sectionTitle"
          controlName="sectionTitle"
          control={control}
          label={t("form.sectionTitle.label")}
          placeholder={t("form.sectionTitle.placeholder")}
          register={register("sectionTitle", {
            pattern: {
              value: REGEX_STRING,
              message: t("form.sectionTitle.errors.required"),
            },
          })}
          Field={InputField}
          size="large"
        />
        <Divider />
      </div>
      <FormList name="tools" append={append} fieldValues={fields}>
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

      <Button
        className="form__button"
        type="primary"
        htmlType="submit"
        size="large"
        disabled={isSubmitDisabled(formState)}
        loading={isSubmitLoading(formState)}
      >
        {tShared("save")}
      </Button>
    </Form>
  );
};

export default PersonalToolsForm;
