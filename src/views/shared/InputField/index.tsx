"use client";
import getInputStatus from "@/utils/getInputStatus";
import { InputFieldProps } from "@/lib/constants/props/forms/inputField";

import InputFieldWrapper from "@/views/shared/InputFieldWrapper";
import Input from "@/views/shared/antd/Input";

const InputField = ({ label, errors, status, ...rest }: InputFieldProps) => {
  return (
    <InputFieldWrapper errors={errors} label={label}>
      <Input status={getInputStatus({ errors, status })} {...rest} />
    </InputFieldWrapper>
  );
};

export default InputField;
