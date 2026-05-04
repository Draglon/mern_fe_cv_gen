"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import {
  PersonalSkillsProps,
  FieldType,
} from "@/lib/constants/props/resume/personalSkills";
import { REGEX_STRING } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalSkills from "@/store/personalSkills/operations/createPersonalSkills";
import updatePersonalSkills from "@/store/personalSkills/operations/updatePersonalSkills";
import { personalSkillsByLocaleSelector } from "@/store/personalSkills/selectors";
import FormItem from "@/views/shared/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import Checkbox from "@/views/shared/antd/Checkbox";
import Divider from "@/views/shared/antd/Divider";

const PersonalSkillsForm = ({ locale, isEdit }: PersonalSkillsProps) => {
  const t = useTranslations("PersonalSkills");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) =>
    personalSkillsByLocaleSelector(state, locale)
  );
  const { control, handleSubmit, register, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
    };

    if (isEdit) {
      await dispatch(updatePersonalSkills(params));
    } else {
      await dispatch(createPersonalSkills(params));
    }
  });

  return (
    <Form
      name={`create-personal-skills-${locale}`}
      className="form form--personal-skills"
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
      <FormList name="skills" append={append} fieldValues={fields}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <FormItem
              name={[index, "skill"]}
              controlName={`skills.${index}.skill`}
              control={control}
              className="form__item--field"
              label={t("form.skill.label")}
              placeholder={t("form.skill.placeholder")}
              size="large"
              Field={InputField}
              register={register(`skills.${index}.skill`, {
                required: {
                  value: true,
                  message: t("form.skill.errors.required"),
                },
              })}
            />
            <FormItem
              name={[index, "level"]}
              controlName={`skills.${index}.level`}
              control={control}
              className="form__item--field"
              label={t("form.level.label")}
              placeholder={t("form.level.placeholder")}
              size="large"
              Field={InputField}
              register={register(`skills.${index}.level`, {
                required: {
                  value: true,
                  message: t("form.level.errors.required"),
                },
              })}
            />
            <FormItem
              name={[index, "visible"]}
              controlName={`skills.${index}.visible`}
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

export default PersonalSkillsForm;
