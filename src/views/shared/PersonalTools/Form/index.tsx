"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import {
  PersonalToolsProps,
  FieldType,
} from "@/lib/constants/props/resume/personalTools";
import useResumeEditRules from "@/hooks/useResumeEditRules";
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
import InputNumberField from "@/views/shared/InputNumberField";
import CheckboxField from "@/views/shared/CheckboxField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalToolsForm = ({ resumeLocale, isEdit }: PersonalToolsProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("PersonalTools");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const defaultValues = useAppSelector((state) =>
    personalToolsByLocaleSelector(state, resumeLocale)
  );

  const { control, handleSubmit, formState, reset } = useForm({
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
      resumeLocale,
    };

    if (isEdit) {
      await dispatch(updatePersonalTools(params));
    } else {
      await dispatch(createPersonalTools(params));
    }

    if (!isEdit) {
      redirect({ href: resumeRoute, locale });
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-tools-${resumeLocale}`}
      className="form form--personal-tools"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <header className="form__header">
        <FormItem
          className="form__item--field"
          name="sectionTitle"
          controlName="sectionTitle"
          control={control}
          label={tShared("form.sectionTitle.label")}
          placeholder={tShared("form.sectionTitle.placeholder")}
          rules={rules.sectionTitleRules}
          Field={InputField}
          size="large"
        />
      </header>
      <FormList name="tools" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="card">
            <header className="card__header">
              <div className="d-flex justify-content-space-between">
                <Title className="mt-0 mr-8" level={3}>
                  {t("cardTitle", { index: index + 1 })}
                </Title>
                <FormItem
                  name={[index, "visible"]}
                  controlName={`tools.${index}.visible`}
                  control={control}
                  className="form__item--field"
                  label={t("form.visible.label")}
                  size="large"
                  Field={CheckboxField}
                />
              </div>

              {fields.length > 1 && (
                <Button className="card__remove" onClick={() => remove(index)}>
                  <DeleteOutlined className="card__remove-icon" />
                </Button>
              )}
            </header>
            <section className="card__section">
              <FormItem
                name={[index, "tool"]}
                controlName={`tools.${index}.tool`}
                control={control}
                className="form__item--field"
                label={t("form.tool.label")}
                placeholder={t("form.tool.placeholder")}
                rules={rules.inputTextNameRules}
                Field={InputField}
                size="large"
              />
              <FormItem
                name={[index, "level"]}
                controlName={`tools.${index}.level`}
                control={control}
                className="form__item--field"
                label={t("form.level.label")}
                placeholder={t("form.level.placeholder")}
                rules={rules.inputNumberLevelRules}
                Field={InputNumberField}
                size="large"
              />
            </section>
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
