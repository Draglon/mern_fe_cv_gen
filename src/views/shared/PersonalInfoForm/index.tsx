"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalInfo from "@/store/personalInfo/operations/createPersonalInfo";
import updatePersonalInfo from "@/store/personalInfo/operations/updatePersonalInfo";
import { userIdSelector, personalInfoIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import UploadFile from "@/views/shared/antd/UploadFile";
import InputField from "@/views/shared/antd/Input";
import TextArea from "@/views/shared/antd/TextArea";
import Button from "@/views/shared/antd/Button";
import Divider from "@/views/shared/antd/Divider";

type PersonalInfoFormProps = {
  locale: string;
  isEdit?: boolean;
};

type FieldType = {
  userUrl: any[];
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  linkedIn: string;
};

const defaultValues = {
  userUrl: [],
  firstName: "",
  lastName: "",
  email: "",
  about: "",
  address: "",
  phoneNumber: "",
  birthday: "",
  linkedIn: "",
};

const PersonalInfoForm = ({ locale, isEdit }: PersonalInfoFormProps) => {
  const t = useTranslations("PersonalInfo");
  const tShared = useTranslations("shared");
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const personalInfoId = useAppSelector(personalInfoIdSelector);
  const { control, handleSubmit } = useForm<FieldType>({
    defaultValues,
    mode: "onChange",
  });

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = {
      ...values,
      locale,
      userId,
      userUrl: values?.userUrl ? values.userUrl : "",
    };

    const data =
      isEdit && personalInfoId
        ? await dispatch(updatePersonalInfo({ ...params, personalInfoId }))
        : await dispatch(createPersonalInfo(params));

    console.log("data: ", data);

    if (!data?.payload) {
      return alert("Не удалось обновить данные");
    }
  });

  return (
    <Form
      name="create-personal-info"
      className="form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <div className="form__wrapper">
        <div className="form__side-left">
          <FormItem
            name="userUrl"
            controlName="userUrl"
            control={control}
            label={t("form.userUrl.label")}
            fieldType="upload"
            Field={UploadFile}
            size="large"
          />
        </div>
        <div className="form__side-right">
          <div className="form__row">
            <FormItem
              className="w-half wrap"
              name="firstName"
              controlName="firstName"
              control={control}
              label={t("form.firstName.label")}
              placeholder={t("form.firstName.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.firstName.errors.required"),
                },
                {
                  min: 3,
                  message: t("form.firstName.errors.min"),
                },
              ]}
              Field={InputField}
              size="large"
            />
            <FormItem
              className="w-half wrap"
              name="lastName"
              controlName="lastName"
              control={control}
              label={t("form.lastName.label")}
              placeholder={t("form.lastName.placeholder")}
              rules={[
                {
                  required: true,
                  message: t("form.lastName.errors.required"),
                },
                {
                  min: 3,
                  message: t("form.lastName.errors.min"),
                },
              ]}
              Field={InputField}
              size="large"
            />
          </div>
          <FormItem
            className="w-full"
            name="about"
            controlName="about"
            control={control}
            label={t("form.about.label")}
            placeholder={t("form.about.placeholder")}
            rules={[
              {
                required: true,
                message: t("form.about.errors.required"),
              },
            ]}
            fieldType="textarea"
            Field={TextArea}
            size="large"
          />

          <Divider />

          <FormItem
            className="w-full"
            name="email"
            type="email"
            controlName="email"
            control={control}
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            rules={[
              {
                required: true,
                message: t("form.email.errors.required"),
              },
            ]}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="w-full"
            name="address"
            controlName="address"
            control={control}
            label={t("form.address.label")}
            placeholder={t("form.address.placeholder")}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="w-full"
            name="phoneNumber"
            controlName="phoneNumber"
            control={control}
            label={t("form.phoneNumber.label")}
            placeholder={t("form.phoneNumber.placeholder")}
            rules={[
              {
                type: true,
                message: t("form.phoneNumber.errors.required"),
              },
            ]}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="w-full"
            name="birthday"
            controlName="birthday"
            control={control}
            label={t("form.birthday.label")}
            placeholder={t("form.birthday.placeholder")}
            Field={InputField}
            size="large"
          />

          <Divider />

          <FormItem
            className="w-full"
            name="linkedIn"
            controlName="linkedIn"
            control={control}
            label={t("form.linkedIn.label")}
            placeholder={t("form.linkedIn.placeholder")}
            Field={InputField}
            size="large"
          />
        </div>
      </div>

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

export default PersonalInfoForm;
