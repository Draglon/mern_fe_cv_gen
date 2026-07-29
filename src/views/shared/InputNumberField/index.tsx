"use client";
import getInputStatus from "@/utils/getInputStatus";
import { InputFieldProps } from "@/lib/constants/props/forms/inputField";

import InputFieldWrapper from "@/views/shared/InputFieldWrapper";
import InputNumber from "@/views/shared/antd/InputNumber";

const InputNumberField = ({
  label,
  errors,
  status,
  ...rest
}: InputFieldProps) => {
  return (
    <InputFieldWrapper errors={errors} label={label}>
      <InputNumber status={getInputStatus({ errors, status })} {...rest} />
    </InputFieldWrapper>
  );
};

export default InputNumberField;
