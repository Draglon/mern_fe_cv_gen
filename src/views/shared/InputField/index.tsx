"use client";
import Input from "@/views/shared/antd/Input";
import { Text } from "@/views/shared/antd/Typography";

type InputFieldProps = {
  errors?: {
    ref: any;
    type: string;
    message: string;
  };
};

const InputField = ({ errors, ...rest }: InputFieldProps) => {
  return (
    <div className="input-field">
      <Input {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default InputField;
