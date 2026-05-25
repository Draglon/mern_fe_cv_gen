"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import {
  PersonalHobbiesProps,
  FieldType,
} from "@/lib/constants/props/resume/personalHobbies";
import useResumeEditRules from "@/hooks/useResumeEditRules";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalHobbies from "@/store/personalHobbies/operations/createPersonalHobbies";
import updatePersonalHobbies from "@/store/personalHobbies/operations/updatePersonalHobbies";
import { personalHobbiesByLocaleSelector } from "@/store/personalHobbies/selectors";

import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import { Title } from "@/views/shared/antd/Typography";

const PersonalHobbiesForm = ({
  resumeLocale,
  isEdit,
}: PersonalHobbiesProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("PersonalHobbies");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const rules = useResumeEditRules();
  const defaultValues = useAppSelector((state) =>
    personalHobbiesByLocaleSelector(state, resumeLocale)
  );
  const { control, handleSubmit, formState, reset } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
      resumeLocale,
    };

    if (isEdit) {
      await dispatch(updatePersonalHobbies(params));
    } else {
      await dispatch(createPersonalHobbies(params));
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form
      name={`create-personal-hobbies-${resumeLocale}`}
      className="form form--personal-hobbies"
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

      <FormList name="hobbies" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="card">
            <header className="card__header">
              <Title className="mt-0" level={3}>
                {t("cardTitle", { index: index + 1 })}
              </Title>
              {fields.length > 1 && (
                <Button className="card__remove" onClick={() => remove(index)}>
                  <DeleteOutlined className="card__remove-icon" />
                </Button>
              )}
            </header>
            <section className="card__section">
              <FormItem
                className="form__item--field"
                name={[index, "hobby"]}
                controlName={`hobbies.${index}.hobby`}
                control={control}
                label={t("form.hobby.label")}
                placeholder={t("form.hobby.placeholder")}
                rules={rules.inputTextRules}
                Field={InputField}
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

export default PersonalHobbiesForm;
