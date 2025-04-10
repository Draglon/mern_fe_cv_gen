"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalExperience from "@/store/personalExperience/operations/createPersonalExperience";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

type FieldType = {
  experience: {
    position: string;
    companyName: string;
    location: string;
    place: string;
    time: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string;
  }[];
};

type PersonalExperienceFormProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const PersonalExperienceForm = ({
  onNext,
  onPrev,
}: PersonalExperienceFormProps) => {
  const tShared = useTranslations("shared");
  const tCreateResume = useTranslations("CreateResume");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      experience: [
        {
          position: "",
          companyName: "",
          location: "",
          place: "",
          time: "",
          startDate: "",
          endDate: "",
          description: "",
          skills: "", // need add array
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };
    const data = await dispatch(createPersonalExperience(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
  });

  return (
    <Form
      name="create-personal-experience"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="experience" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline">
            <FormItem
              name={[index, "position"]}
              controlName={`experience[${index}].position`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.position.label")}
              placeholder={tCreateResume("form.position.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.position.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "companyName"]}
              controlName={`experience[${index}].companyName`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.companyName.label")}
              placeholder={tCreateResume("form.companyName.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.companyName.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "location"]}
              controlName={`experience[${index}].location`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.location.label")}
              placeholder={tCreateResume("form.location.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.location.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "place"]}
              controlName={`experience[${index}].place`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.place.label")}
              placeholder={tCreateResume("form.place.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.place.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "time"]}
              controlName={`experience[${index}].time`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.time.label")}
              placeholder={tCreateResume("form.time.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.time.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`experience[${index}].startDate`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.startDate.label")}
              placeholder={tCreateResume("form.startDate.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.startDate.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "endDate"]}
              controlName={`experience[${index}].endDate`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.endDate.label")}
              placeholder={tCreateResume("form.endDate.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.endDate.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "description"]}
              controlName={`experience[${index}].description`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.description.label")}
              placeholder={tCreateResume("form.description.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.description.error"),
                },
              ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "skills"]}
              controlName={`experience[${index}].skills`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={tCreateResume("form.skills.label")}
              placeholder={tCreateResume("form.skills.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.skills.error"),
                },
              ]}
              size="large"
              Field={Input}
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

export default PersonalExperienceForm;
