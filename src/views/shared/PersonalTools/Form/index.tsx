"use client";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { redirect } from "@/i18n/navigation";
import { resumeRoute } from "@/lib/routes";
import {
  PersonalToolsProps,
  FieldType,
} from "@/lib/constants/props/resume/personalTools";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getSectionTitleRules } from "@/utils/forms/validations/resume/sectionTitleValidation";
import { getInputTextNameRules } from "@/utils/forms/validations/resume/inputTextNameValidation";
import { getInputNumberRules } from "@/utils/forms/validations/resume/inputNumberValidation";
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

const PersonalToolsForm = ({ locale, isEdit }: PersonalToolsProps) => {
  const t = useTranslations("PersonalTools");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalToolsByLocaleSelector(state, locale)
  );

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });
  const sectionTitleRules = useMemo(
    () => getSectionTitleRules(tShared),
    [tShared]
  );
  const inputTextNameRules = useMemo(
    () => getInputTextNameRules(tShared),
    [tShared]
  );
  const inputNumberRules = useMemo(
    () => getInputNumberRules(tShared),
    [tShared]
  );

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
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
          label={tShared("form.sectionTitle.label")}
          placeholder={tShared("form.sectionTitle.placeholder")}
          rules={sectionTitleRules}
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
              rules={inputTextNameRules}
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
              rules={inputNumberRules}
              Field={InputField}
              size="large"
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
