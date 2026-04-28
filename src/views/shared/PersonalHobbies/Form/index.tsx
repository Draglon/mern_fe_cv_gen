"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { Locales } from "@/lib/constants/props/locales";
import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH } from "@/lib/constants";
import { REGEX_STRING } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import isSubmitLoading from "@/utils/isSubmitLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalHobbies from "@/store/personalHobbies/operations/createPersonalHobbies";
import updatePersonalHobbies from "@/store/personalHobbies/operations/updatePersonalHobbies";
import { personalHobbiesByLocaleSelector } from "@/store/personalHobbies/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import InputField from "@/views/shared/InputField";
import Divider from "@/views/shared/antd/Divider";

type PersonalHobbiesFormProps = {
  locale: Locales;
  isEdit?: boolean;
};

type FieldType = {
  sectionTitle?: string;
  hobbies: { hobby: string }[];
};

const PersonalHobbiesForm = ({ locale, isEdit }: PersonalHobbiesFormProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("PersonalHobbies");
  const tShared = useTranslations("shared");
  const defaultValues = useAppSelector((state) =>
    personalHobbiesByLocaleSelector(state, locale)
  );

  const { control, handleSubmit, formState, register, reset } =
    useForm<FieldType>({
      defaultValues,
      mode: "onChange",
    });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      values,
      locale,
    };

    const data = isEdit
      ? await dispatch(updatePersonalHobbies(params))
      : await dispatch(createPersonalHobbies(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
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
          label={t("form.sectionTitle.label")}
          placeholder={t("form.sectionTitle.placeholder")}
          register={register("sectionTitle", {
            pattern: {
              value: REGEX_STRING,
              message: t("form.sectionTitle.errors.pattern"),
            },
            minLength: {
              value: MIN_INPUT_LENGTH,
              message: t("form.sectionTitle.errors.minLength", {
                minLength: MIN_INPUT_LENGTH,
              }),
            },
            maxLength: {
              value: MAX_INPUT_LENGTH,
              message: t("form.sectionTitle.errors.maxLength", {
                maxLength: MAX_INPUT_LENGTH,
              }),
            },
          })}
          errors={errors["sectionTitle"]}
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
              size="large"
              Field={InputField}
              register={register(`hobbies.${index}.hobby`, {
                required: {
                  value: true,
                  message: t("form.hobby.errors.required"),
                },
              })}
              errors={errors["hobbies"]?.[index]?.hobby}
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
          loading={isSubmitLoading(formState)}
        >
          {tShared("save")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalHobbiesForm;
