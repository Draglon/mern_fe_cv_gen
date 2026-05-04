"use client";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import {
  PersonalLanguagesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalLanguages";
import { LANGUAGE_LEVEL } from "@/lib/constants/languages";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { getSectionTitleRules } from "@/utils/forms/validations/resume/sectionTitleValidation";
import { getInputTextRules } from "@/utils/forms/validations/resume/inputTextValidation";
import { getSelectLanguageRules } from "@/utils/forms/validations/resume/selectValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalLanguages from "@/store/personalLanguages/operations/createPersonalLanguages";
import updatePersonalLanguages from "@/store/personalLanguages/operations/updatePersonalLanguages";
import { personalLanguagesByLocaleSelector } from "@/store/personalLanguages/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import SelectField from "@/views/shared/SelectField";
import Divider from "@/views/shared/antd/Divider";

const PersonalLanguagesForm = ({ locale, isEdit }: PersonalLanguagesProps) => {
  const t = useTranslations("PersonalLanguages");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalLanguagesByLocaleSelector(state, locale)
  );
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  const sectionTitleRules = useMemo(
    () => getSectionTitleRules(tShared),
    [tShared]
  );
  const selectLanguageRules = useMemo(() => getSelectLanguageRules(t), [t]);
  const inputTextRules = useMemo(() => getInputTextRules(tShared), [tShared]);

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
    };

    if (isEdit) {
      await dispatch(updatePersonalLanguages(params));
    } else {
      await dispatch(createPersonalLanguages(params));
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-languages-${locale}`}
      className="form form--personal-languages"
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
      <FormList name="languages" append={append} fieldValues={fields}>
        {fields.map((field, index) => {
          return (
            <Space key={field.id} align="baseline" className="form__list-space">
              <FormItem
                className="form__item--field"
                name={[index, "language"]}
                controlName={`languages.${index}.language`}
                control={control}
                label={t("form.language.label")}
                placeholder={t("form.language.placeholder")}
                rules={inputTextRules}
                Field={InputField}
                size="large"
              />
              <FormItem
                className="form__item--field"
                name={[index, "level"]}
                controlName={`languages.${index}.level`}
                control={control}
                label={t("form.languageLevel.label")}
                placeholder={t("form.languageLevel.placeholder")}
                rules={selectLanguageRules}
                Field={SelectField}
                options={LANGUAGE_LEVEL.map((level) => ({
                  label: t(`form.languageLevel.levelOptions.${level}`),
                  value: level,
                }))}
                size="large"
              />
              {fields.length > 1 && (
                <MinusCircleOutlined
                  className="form__item--button-remove"
                  onClick={() => remove(index)}
                />
              )}
            </Space>
          );
        })}
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

export default PersonalLanguagesForm;
