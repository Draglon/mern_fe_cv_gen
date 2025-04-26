"use client";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty } from "ramda";

import { Locales } from "@/lib/constants/props/locales";
import { hobbiesByLocale } from "@/utils/personalHobbies";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalHobbies from "@/store/personalHobbies/operations/createPersonalHobbies";
import updatePersonalHobbies from "@/store/personalHobbies/operations/updatePersonalHobbies";
import {
  userIdSelector,
  personalHobbiesIdSelector,
} from "@/store/auth/selectors";
import { personalHobbiesSelector } from "@/store/personalHobbies/selectors";

import FormItem from "@/views/shared/antd/FormItem";
import FormList from "@/views/shared/antd/FormList";
import Button from "@/views/shared/antd/Button";
import Input from "@/views/shared/antd/Input";

type PersonalHobbiesFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  hobbies: { hobby: string }[];
};

const PersonalHobbiesForm = ({ locale, isEdit }: PersonalHobbiesFormProps) => {
  const t = useTranslations("PersonalHobbies");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalHobbiesId = useAppSelector(personalHobbiesIdSelector);
  const personalHobbies = useAppSelector(personalHobbiesSelector);
  const hobbies = hobbiesByLocale(personalHobbies, locale as Locales);

  const { control, handleSubmit } = useForm<FieldType>({
    values: {
      hobbies: !isEmpty(hobbies) ? hobbies : [{ hobby: "" }],
    },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
    };

    const data =
      isEdit && personalHobbiesId
        ? await dispatch(
            updatePersonalHobbies({ ...params, personalHobbiesId })
          )
        : await dispatch(createPersonalHobbies(params));

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }
  });

  return (
    <Form
      name={`create-personal-hobbies-${locale}}`}
      className="form form--create-hobbies"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      preserve
    >
      <FormList name="hobbies" append={append}>
        {fields.map((field, index) => (
          <Space
            key={field.id}
            className="form__list-space mb-8 w-full"
            align="center"
          >
            <FormItem
              name={field.id}
              controlName={`hobbies[${index}].hobby`}
              control={control}
              fieldClassName="form__item-field"
              label={t("form.hobby.label")}
              placeholder={t("form.hobby.placeholder")}
              size="large"
              Field={Input}
              // rules={[
              //   {
              //     required: true,
              //     message: t("form.hobby.errors.required"),
              //   },
              // ]}
            />
            {fields.length > 1 && (
              <MinusCircleOutlined
                className="form__item-button-remove"
                onClick={() => remove(index)}
              />
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

export default PersonalHobbiesForm;
