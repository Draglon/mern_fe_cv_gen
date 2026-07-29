"use client";
import getInputStatus from "@/utils/getInputStatus";
import { InputFieldProps } from "@/lib/constants/props/forms/inputField";

import InputFieldWrapper from "@/views/shared/InputFieldWrapper";
import TextArea from "@/views/shared/antd/TextArea";

const TextAreaField = ({ label, errors, status, ...rest }: InputFieldProps) => {
  return (
    <InputFieldWrapper errors={errors} label={label}>
      <TextArea status={getInputStatus({ errors, status })} {...rest} />
    </InputFieldWrapper>
  );
};

export default TextAreaField;
