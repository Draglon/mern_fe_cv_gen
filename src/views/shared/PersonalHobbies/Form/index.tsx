"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

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
import Divider from "@/views/shared/antd/Divider";

const PersonalHobbiesForm = ({ locale, isEdit }: PersonalHobbiesProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("PersonalHobbies");
  const tShared = useTranslations("shared");
  const rules = useResumeEditRules();
  const defaultValues = useAppSelector((state) =>
    personalHobbiesByLocaleSelector(state, locale)
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
      name={`create-personal-hobbies-${locale}`}
      className="form form--personal-hobbies"
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
          rules={rules.sectionTitleRules}
          Field={InputField}
          size="large"
        />
        <Divider />
      </div>

      <FormList name="hobbies" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
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

export default PersonalHobbiesForm;
