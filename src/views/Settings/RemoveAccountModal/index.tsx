"use client";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { useRouter } from "@/i18n/navigation";
import { MIN_NIKE_NAME_LENGTH, MAX_NIKE_NAME_LENGTH } from "@/lib/constants";
import { REGEX_NICK_NAME } from "@/lib/constants/regex";
import isSubmitDisabled from "@/utils/isSubmitDisabled";
import {
  isErrorStatusForbidden,
  isErrorStatusNotFound,
} from "@/utils/getErrorStatus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideModal as hideModalAction } from "@/store/modal/actions";
import removeAccount from "@/store/settings/operations/removeAccount";
import { userIdSelector } from "@/store/auth/selectors";
import {
  isLoadingSelector,
  settingsErrorSelector,
} from "@/store/settings/selectors";

import Modal from "@/views/shared/antd/Modal";
import Alert from "@/views/shared/antd/Alert";
import Form from "@/views/shared/antd/Form";
import FormItem from "@/views/shared/antd/FormItem";
import InputField from "@/views/shared/InputField";
import Button from "@/views/shared/antd/Button";

export type FieldType = {
  userName: string;
};

const RemoveAccountModal = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("Settings");
  const locale = useLocale();
  const router = useRouter();
  const userId = useAppSelector(userIdSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const settingsError = useAppSelector(settingsErrorSelector);

  const { control, handleSubmit, formState, register } = useForm<FieldType>({
    defaultValues: { userName: "" },
    mode: "onChange",
  });
  const { errors } = formState;

  const onFinish = handleSubmit(async (values: FieldType) => {
    const params = { userId, values, router, locale };
    await dispatch(removeAccount(params));
  });

  const onCloseModal = () => {
    dispatch(hideModalAction());
  };

  return (
    <Modal
      className="modal"
      title={t("removeAccount.modal.title")}
      onCancel={onCloseModal}
      footer={null}
    >
      {(isErrorStatusNotFound(settingsError) ||
        isErrorStatusForbidden(settingsError)) && (
        <Alert
          className="mb-16"
          type="error"
          title={t("removeAccount.modal.form.alert.error")}
        />
      )}
      <Form
        name="removeAccount"
        className="form--small"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <FormItem
          name="userName"
          controlName="userName"
          control={control}
          label={t("removeAccount.modal.form.userName.label")}
          placeholder={t("removeAccount.modal.form.userName.placeholder")}
          register={register("userName", {
            required: t("removeAccount.modal.form.userName.errors.required"),
            pattern: {
              value: REGEX_NICK_NAME,
              message: t("removeAccount.modal.form.userName.errors.pattern"),
            },
            minLength: {
              value: MIN_NIKE_NAME_LENGTH,
              message: t("removeAccount.modal.form.userName.errors.minLength", {
                minLength: MIN_NIKE_NAME_LENGTH,
              }),
            },
            maxLength: {
              value: MAX_NIKE_NAME_LENGTH,
              message: t("removeAccount.modal.form.userName.errors.maxLength", {
                maxLength: MAX_NIKE_NAME_LENGTH,
              }),
            },
          })}
          errors={errors["userName"]}
          Field={InputField}
          size="large"
        />

        <FormItem name="buttons" className="text-right">
          <Button
            className="form__button"
            color="danger"
            type="primary"
            htmlType="submit"
            size="middle"
            disabled={isSubmitDisabled(formState)}
            loading={isLoading}
          >
            {t("removeAccount.modal.form.submitButton")}
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default RemoveAccountModal;
