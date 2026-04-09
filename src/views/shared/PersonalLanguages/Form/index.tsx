"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, path, pathOr } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { REGEX_STRING } from "@/lib/constants/regex";
import { LANGUAGE_LEVEL } from "@/lib/constants/languages";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import { languagesByLocale } from "@/utils/personalLanguages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalLanguages from "@/store/personalLanguages/operations/createPersonalLanguages";
import updatePersonalLanguages from "@/store/personalLanguages/operations/updatePersonalLanguages";
import {
  userIdSelector,
  personalLanguagesIdSelector,
} from "@/store/auth/selectors";
import { personalLanguagesSelector } from "@/store/personalLanguages/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import SelectField from "@/views/shared/SelectField";
import Divider from "@/views/shared/antd/Divider";

type PersonalLanguagesFormProps = {
  locale: Locales;
  isEdit?: boolean;
};

type FieldType = {
  sectionTitle?: string;
  languages: { language: string; level: string }[];
};

const PersonalLanguagesForm = ({
  locale,
  isEdit,
}: PersonalLanguagesFormProps) => {
  const t = useTranslations("PersonalLanguages");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalLanguagesId = useAppSelector(personalLanguagesIdSelector);
  const personalLanguages = useAppSelector(personalLanguagesSelector);

  const { control, handleSubmit, formState, register } = useForm({
    values: {
      sectionTitle: pathOr("", ["sectionTitle", locale], personalLanguages),
      languages: !isEmpty(languagesByLocale(personalLanguages, locale))
        ? languagesByLocale(personalLanguages, locale)
        : [{ language: "", level: "" }],
    },
    mode: "onChange",
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };

    const data =
      isEdit && personalLanguagesId
        ? await dispatch(
            updatePersonalLanguages({ ...params, personalLanguagesId })
          )
        : await dispatch(createPersonalLanguages(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }
  });

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
          label={t("form.sectionTitle.label")}
          placeholder={t("form.sectionTitle.placeholder")}
          register={register("sectionTitle", {
            pattern: {
              value: REGEX_STRING,
              message: t("form.sectionTitle.errors.required"),
            },
          })}
          errors={errors["sectionTitle"]}
          Field={InputField}
          size="large"
        />
        <Divider />
      </div>
      <FormList name="languages" append={append}>
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
                size="large"
                Field={InputField}
                register={register(`languages.${index}.language`, {
                  required: {
                    value: true,
                    message: t("form.language.errors.required"),
                  },
                })}
                errors={path(["languages", index, "language"], errors)}
              />
              <FormItem
                className="form__item--field"
                name={[index, "level"]}
                controlName={`languages.${index}.level`}
                control={control}
                label={t("form.languageLevel.label")}
                placeholder={t("form.languageLevel.placeholder")}
                Field={SelectField}
                options={LANGUAGE_LEVEL.map((level) => ({
                  label: t(`form.languageLevel.levelOptions.${level}`),
                  value: level,
                }))}
                size="large"
                register={register(`languages.${index}.level`, {
                  required: {
                    value: true,
                    message: t("form.languageLevel.errors.required"),
                  },
                })}
                errors={path(["languages", index, "level"], errors)}
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

export default PersonalLanguagesForm;
