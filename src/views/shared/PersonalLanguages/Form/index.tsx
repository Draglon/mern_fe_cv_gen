"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import {
  PersonalLanguagesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalLanguages";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import { LANGUAGE_LEVEL } from "@/lib/constants/languages";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalLanguages from "@/store/personalLanguages/operations/createPersonalLanguages";
import updatePersonalLanguages from "@/store/personalLanguages/operations/updatePersonalLanguages";
import { personalLanguagesByLocaleSelector } from "@/store/personalLanguages/selectors";
import { personalLanguagesIdSelector } from "@/store/auth/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import SelectField from "@/views/shared/SelectField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalLanguagesForm = ({
  resumeLocale,
  isEdit,
}: PersonalLanguagesProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("PersonalLanguages");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const defaultValues = useAppSelector((state) =>
    personalLanguagesByLocaleSelector(state, resumeLocale)
  );
  const personalLanguagesId = useAppSelector(personalLanguagesIdSelector);
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
      resumeLocale,
    };

    if (isEdit && personalLanguagesId) {
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
      name={`create-personal-languages-${resumeLocale}`}
      className="form form--personal-languages"
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
      <FormList name="languages" append={append} fieldValues={fields}>
        {fields.map((field, index) => {
          return (
            <Space key={field.id} align="baseline" className="card">
              <header className="card__header">
                <Title className="mt-0" level={3}>
                  {t("cardTitle", { index: index + 1 })}
                </Title>
                <Button className="card__remove" onClick={() => remove(index)}>
                  <DeleteOutlined className="card__remove-icon" />
                </Button>
              </header>
              <section className="card__section">
                <FormItem
                  className="form__item--field"
                  name={[index, "language"]}
                  controlName={`languages.${index}.language`}
                  control={control}
                  label={t("form.language.label")}
                  placeholder={t("form.language.placeholder")}
                  rules={rules.inputTextRules}
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
                  rules={rules.selectLanguageRules}
                  Field={SelectField}
                  options={LANGUAGE_LEVEL.map((level) => ({
                    label: t(
                      `form.languageLevel.levelOptions.${level}.${resumeLocale}`
                    ),
                    value: level,
                  }))}
                  size="large"
                />
              </section>
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
