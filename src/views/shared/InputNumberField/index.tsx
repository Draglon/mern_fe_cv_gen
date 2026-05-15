"use client";
import isPresent from "@/utils/isPresent";
import InputNumber from "@/views/shared/antd/InputNumber";
import { Text } from "@/views/shared/antd/Typography";

type InputFieldProps = {
  label?: string;
  status?: "error" | "warning";
  errors?: {
    type: string;
    message: string;
  };
};

const InputNumberField = ({
  label,
  errors,
  status,
  ...rest
}: InputFieldProps) => {
  return (
    <div className="input-field">
      {label && <label className="input-field__label">{label}</label>}
      <InputNumber status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default InputNumberField;
