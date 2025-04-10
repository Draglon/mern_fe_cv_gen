"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { Form } from "antd";
// import type { FormProps } from "antd";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalInfo from "@/store/personalInfo/operations/createPersonalInfo";
import { userIdSelector } from "@/store/auth/selectors";
import FormItem from "@/views/shared/antd/FormItem";
import UploadFile from "@/views/shared/antd/UploadFile";
import InputField from "@/views/shared/antd/Input";
import TextArea from "@/views/shared/antd/TextArea";
import Button from "@/views/shared/antd/Button";
import Divider from "@/views/shared/antd/Divider";

type FieldType = {
  userUrl: any[];
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  skype: string;
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
  skype: "",
  linkedIn: "",
};

const PersonalInfoForm = ({ onNext }: { onNext?: () => void }) => {
  const tCreateResume = useTranslations("CreateResume");
  const tShared = useTranslations("shared");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
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

    const data = await dispatch(createPersonalInfo(params));

    console.log("data: ", data);

    if (!data.payload) {
      return alert("Не удалось получить данные");
    }

    onNext?.();
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
            label={tCreateResume("form.userUrl.label")}
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
              label={tCreateResume("form.firstName.label")}
              placeholder={tCreateResume("form.firstName.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.firstName.errors.required"),
                },
                {
                  min: 3,
                  message: tCreateResume("form.firstName.errors.min"),
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
              label={tCreateResume("form.lastName.label")}
              placeholder={tCreateResume("form.lastName.placeholder")}
              rules={[
                {
                  required: true,
                  message: tCreateResume("form.lastName.errors.required"),
                },
                {
                  min: 3,
                  message: tCreateResume("form.lastName.errors.min"),
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
            label={tCreateResume("form.about.label")}
            placeholder={tCreateResume("form.about.placeholder")}
            rules={[
              {
                required: true,
                message: tCreateResume("form.about.errors.required"),
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
            label={tCreateResume("form.email.label")}
            placeholder={tCreateResume("form.email.placeholder")}
            rules={[
              {
                required: true,
                message: tCreateResume("form.email.errors.required"),
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
            label={tCreateResume("form.address.label")}
            placeholder={tCreateResume("form.address.placeholder")}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="w-full"
            name="phoneNumber"
            controlName="phoneNumber"
            control={control}
            label={tCreateResume("form.phoneNumber.label")}
            placeholder={tCreateResume("form.phoneNumber.placeholder")}
            rules={[
              {
                type: "email",
                message: tCreateResume("form.phoneNumber.errors.email"),
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
            label={tCreateResume("form.birthday.label")}
            placeholder={tCreateResume("form.birthday.placeholder")}
            Field={InputField}
            size="large"
          />

          <Divider />

          <FormItem
            className="w-full"
            name="skype"
            controlName="skype"
            control={control}
            label={tCreateResume("form.skype.label")}
            placeholder={tCreateResume("form.skype.placeholder")}
            Field={InputField}
            size="large"
          />
          <FormItem
            className="w-full"
            name="linkedIn"
            controlName="linkedIn"
            control={control}
            label={tCreateResume("form.linkedIn.label")}
            placeholder={tCreateResume("form.linkedIn.placeholder")}
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
          {tShared("next")}
        </Button>
      </FormItem>
    </Form>
  );
};

export default PersonalInfoForm;
