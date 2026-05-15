"use client";
import isPresent from "@/utils/isPresent";
import TextArea from "@/views/shared/antd/TextArea";
import { Text } from "@/views/shared/antd/Typography";

type TextAreaFieldProps = {
  label?: string;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
};

const TextAreaField = ({
  label,
  errors,
  status,
  ...rest
}: TextAreaFieldProps) => {
  return (
    <div className="input-field">
      {label && <label className="input-field__label">{label}</label>}
      <TextArea status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default TextAreaField;
