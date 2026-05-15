"use client";
import isPresent from "@/utils/isPresent";
import Input from "@/views/shared/antd/Input";
import { Text } from "@/views/shared/antd/Typography";

type InputFieldProps = {
  label?: string;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
};

const InputField = ({ label, errors, status, ...rest }: InputFieldProps) => {
  return (
    <div className="input-field">
      {label && <label className="input-field__label">{label}</label>}
      <Input status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default InputField;
