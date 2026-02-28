"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, path } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import { skillsByLocale } from "@/utils/personalSkills";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalSkills from "@/store/personalSkills/operations/createPersonalSkills";
import updatePersonalSkills from "@/store/personalSkills/operations/updatePersonalSkills";
import {
  userIdSelector,
  personalSkillsIdSelector,
} from "@/store/auth/selectors";
import { personalSkillsSelector } from "@/store/personalSkills/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import Checkbox from "@/views/shared/antd/Checkbox";

type PersonalSkillsFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  skills: {
    skill: string;
    level: string;
    visible: boolean;
  }[];
};

const PersonalSkillsForm = ({ locale, isEdit }: PersonalSkillsFormProps) => {
  const t = useTranslations("PersonalSkills");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalSkillsId = useAppSelector(personalSkillsIdSelector);
  const personalSkills = useAppSelector(personalSkillsSelector);
  const skills = skillsByLocale(personalSkills, locale as Locales);

  const { control, handleSubmit, register, formState } = useForm({
    values: {
      skills: !isEmpty(skills)
        ? skills
        : [
            {
              skill: "",
              level: "",
              visible: true,
            },
          ],
    },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };

    const data =
      isEdit && personalSkillsId
        ? await dispatch(updatePersonalSkills({ ...params, personalSkillsId }))
        : await dispatch(createPersonalSkills(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
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
      <FormList name="skills" append={append}>
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
              errors={path(["skills", index, "skill"], errors)}
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
              errors={path(["skills", index, "level"], errors)}
            />
            <FormItem
              name={[index, "visible"]}
              controlName={`skills.${index}.visible`}
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
          disabled={isSubmitDisabled(formState)}
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalSkillsForm;
