"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalSkills from "@/store/personalSkills/operations/createPersonalSkills";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";
import Checkbox from "@/views/shared/antd/Checkbox";

type FieldType = {
  skills: {
    skill: string;
    level: string;
    visible: boolean;
  }[];
};

type PersonalSkillsFormProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const PersonalSkillsForm = ({ onNext, onPrev }: PersonalSkillsFormProps) => {
  const tShared = useTranslations("shared");
  const tCreateResume = useTranslations("CreateResume");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      skills: [
        {
          skill: "",
          level: "",
          visible: true,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };
    const data = await dispatch(createPersonalSkills(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
  });

  return (
    <Form
      name="create-personal-skills"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="skills" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline">
            <FormItem
              name={[index, "skill"]}
              controlName={`skills[${index}].skill`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.skill.label")}
              placeholder={tCreateResume("form.skill.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.skill.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "level"]}
              controlName={`skills[${index}].level`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.level.label")}
              placeholder={tCreateResume("form.level.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.level.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "visible"]}
              controlName={`skills[${index}].visible`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.visible.label")}
              size="large"
              Field={Checkbox}
            />
            {fields.length > 1 && (
              <MinusCircleOutlined onClick={() => remove(index)} />
            )}
          </Space>
        ))}
      </FormList>

      <FormItem
        className="form__buttons d-flex justify-content-end"
        name="buttons"
      >
        <Button
          className="form__button mr-16"
          color="default"
          type="default"
          htmlType="button"
          size="large"
          onClick={onPrev}
        >
          {tShared("previous")}
        </Button>
        <Button
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {tShared("next")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalSkillsForm;
