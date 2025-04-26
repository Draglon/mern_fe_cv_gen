"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { experienceByLocale } from "@/utils/personalExperience";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalExperience from "@/store/personalExperience/operations/createPersonalExperience";
import updatePersonalExperience from "@/store/personalExperience/operations/updatePersonalExperience";
import {
  userIdSelector,
  personalExperienceIdSelector,
} from "@/store/auth/selectors";
import { personalExperienceSelector } from "@/store/personalExperience/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";
import Select from "@/views/shared/antd/Select";

type PersonalExperienceFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  experience: {
    position: string;
    companyName: string;
    location: string;
    placeOfWork: string;
    workingTime: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string;
  }[];
};

const PersonalExperienceForm = ({
  locale,
  isEdit,
}: PersonalExperienceFormProps) => {
  const t = useTranslations("PersonalExperience");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalExperienceId = useAppSelector(personalExperienceIdSelector);
  const personalExperience = useAppSelector(personalExperienceSelector);
  const experience = experienceByLocale(personalExperience, locale as Locales);

  const { control, handleSubmit } = useForm({
    values: {
      experience: !isEmpty(experience)
        ? experience
        : [
            {
              position: "",
              companyName: "",
              location: "",
              placeOfWork: "",
              workingTime: "",
              startDate: "",
              endDate: "",
              description: "",
              skills: [],
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

    const data =
      isEdit && personalExperienceId
        ? await dispatch(
            updatePersonalExperience({ ...params, personalExperienceId })
          )
        : await dispatch(createPersonalExperience(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }
  });

  return (
    <Form
      name={`create-personal-experience-${locale}}`}
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
              label={t("form.position.label")}
              placeholder={t("form.position.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.position.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "companyName"]}
              controlName={`experience[${index}].companyName`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.companyName.label")}
              placeholder={t("form.companyName.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.companyName.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "location"]}
              controlName={`experience[${index}].location`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.location.label")}
              placeholder={t("form.location.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.location.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "placeOfWork"]}
              controlName={`experience[${index}].placeOfWork`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.placeOfWork.label")}
              placeholder={t("form.placeOfWork.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.placeOfWork.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "workingTime"]}
              controlName={`experience[${index}].workingTime`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.workingTime.label")}
              placeholder={t("form.workingTime.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.workingTime.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`experience[${index}].startDate`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.startDate.label")}
              placeholder={t("form.startDate.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.startDate.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "endDate"]}
              controlName={`experience[${index}].endDate`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.endDate.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "description"]}
              controlName={`experience[${index}].description`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.description.error"),
              //   },
              // ]}
              size="large"
              Field={Input}
            />
            <FormItem
              name={[index, "skills"]}
              controlName={`experience[${index}].skills`}
              control={control}
              className="form__item"
              fieldClassName="form__item-field"
              label={t("form.skills.label")}
              placeholder={t("form.skills.placeholder")}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.skills.error"),
              //   },
              // ]}
              mode="tags"
              size="large"
              Field={Select}
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
          className="form__button"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalExperienceForm;
