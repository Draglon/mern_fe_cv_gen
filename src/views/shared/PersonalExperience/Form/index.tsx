"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, path, pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
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
import InputField from "@/views/shared/InputField";
import TextAreaField from "@/views/shared/TextAreaField";
import SelectField from "@/views/shared/SelectField";

type PersonalExperienceFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  sectionTitle?: string;
  lastPlacesOfWorks?: number;
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

  const { control, handleSubmit, register, formState } = useForm({
    values: {
      sectionTitle: pathOr("", ["sectionTitle", locale], personalExperience),
      lastPlacesOfWorks: pathOr("", ["lastPlacesOfWorks"], personalExperience),
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
  const { errors } = formState;
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
      name={`create-personal-experience-${locale}`}
      className="form form--personal-experience"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <div className="w-full">
        <FormItem
          className="form__item--field"
          name="sectionTitle"
          controlName="sectionTitle"
          control={control}
          label={t("form.sectionTitle.label")}
          placeholder={t("form.sectionTitle.placeholder")}
          register={register("sectionTitle", {
            required: {
              value: true,
              message: t("form.sectionTitle.errors.required"),
            },
          })}
          errors={errors["sectionTitle"]}
          Field={InputField}
          size="large"
        />
      </div>
      <div className="w-full">
        <FormItem
          className="form__item--field"
          name="lastPlacesOfWorks"
          controlName="lastPlacesOfWorks"
          control={control}
          label={t("form.lastPlacesOfWorks.label")}
          placeholder={t("form.lastPlacesOfWorks.placeholder")}
          register={register("lastPlacesOfWorks", {
            required: {
              value: true,
              message: t("form.lastPlacesOfWorks.errors.required"),
            },
          })}
          errors={errors["lastPlacesOfWorks"]}
          Field={InputField}
          size="large"
        />
      </div>
      <FormList name="experience" append={append}>
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" className="form__list-space">
            <FormItem
              name={[index, "position"]}
              controlName={`experience.${index}.position`}
              control={control}
              className="form__item--field"
              label={t("form.position.label")}
              placeholder={t("form.position.placeholder")}
              register={register(`experience.${index}.position`, {
                required: {
                  value: true,
                  message: t("form.position.errors.required"),
                },
              })}
              errors={path(["experience", index, "position"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "companyName"]}
              controlName={`experience.${index}.companyName`}
              control={control}
              className="form__item--field"
              label={t("form.companyName.label")}
              placeholder={t("form.companyName.placeholder")}
              register={register(`experience.${index}.companyName`, {
                required: {
                  value: true,
                  message: t("form.companyName.errors.required"),
                },
              })}
              errors={path(["experience", index, "companyName"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "location"]}
              controlName={`experience[${index}].location`}
              control={control}
              className="form__item--field"
              label={t("form.location.label")}
              placeholder={t("form.location.placeholder")}
              register={register(`experience.${index}.location`, {
                required: {
                  value: true,
                  message: t("form.location.errors.required"),
                },
              })}
              errors={path(["experience", index, "location"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "placeOfWork"]}
              controlName={`experience[${index}].placeOfWork`}
              control={control}
              className="form__item--field"
              label={t("form.placeOfWork.label")}
              placeholder={t("form.placeOfWork.placeholder")}
              register={register(`experience.${index}.placeOfWork`, {
                required: {
                  value: true,
                  message: t("form.placeOfWork.errors.required"),
                },
              })}
              errors={path(["experience", index, "placeOfWork"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "workingTime"]}
              controlName={`experience[${index}].workingTime`}
              control={control}
              className="form__item--field"
              label={t("form.workingTime.label")}
              placeholder={t("form.workingTime.placeholder")}
              register={register(`experience.${index}.workingTime`, {
                required: {
                  value: true,
                  message: t("form.workingTime.errors.required"),
                },
              })}
              errors={path(["experience", index, "workingTime"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "startDate"]}
              controlName={`experience[${index}].startDate`}
              control={control}
              className="form__item--field"
              label={t("form.startDate.label")}
              placeholder={t("form.startDate.placeholder")}
              register={register(`experience.${index}.startDate`, {
                required: {
                  value: true,
                  message: t("form.startDate.errors.required"),
                },
              })}
              errors={path(["experience", index, "startDate"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "endDate"]}
              controlName={`experience[${index}].endDate`}
              control={control}
              className="form__item--field"
              label={t("form.endDate.label")}
              placeholder={t("form.endDate.placeholder")}
              register={register(`experience.${index}.endDate`, {
                required: {
                  value: true,
                  message: t("form.endDate.errors.required"),
                },
              })}
              errors={path(["experience", index, "endDate"], errors)}
              size="large"
              Field={InputField}
            />
            <FormItem
              name={[index, "description"]}
              controlName={`experience[${index}].description`}
              control={control}
              className="form__item--field"
              label={t("form.description.label")}
              placeholder={t("form.description.placeholder")}
              register={register(`experience.${index}.description`, {
                required: {
                  value: true,
                  message: t("form.description.errors.required"),
                },
              })}
              errors={path(["experience", index, "description"], errors)}
              size="large"
              Field={TextAreaField}
            />
            <FormItem
              name={[index, "skills"]}
              controlName={`experience[${index}].skills`}
              control={control}
              className="form__item--field"
              label={t("form.skills.label")}
              placeholder={t("form.skills.placeholder")}
              register={register(`experience.${index}.skills`, {
                required: {
                  value: true,
                  message: t("form.skills.errors.required"),
                },
              })}
              errors={path(["experience", index, "skills"], errors)}
              mode="tags"
              size="large"
              Field={SelectField}
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
          disabled={isSubmitDisabled(formState, false)}
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalExperienceForm;
