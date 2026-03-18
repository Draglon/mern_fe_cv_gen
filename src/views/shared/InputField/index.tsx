"use client";
import isPresent from "@/utils/isPresent";
import Input from "@/views/shared/antd/Input";
import { Text } from "@/views/shared/antd/Typography";

type InputFieldProps = {
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    ref: any;
    type: string;
    message: string;
  };
};

const InputField = ({ errors, status, ...rest }: InputFieldProps) => {
  return (
    <div className="input-field">
      <Input status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default InputField;
