"use client";
import getInputStatus from "@/utils/getInputStatus";
import { InputFieldProps } from "@/lib/constants/props/forms/inputField";

import InputFieldWrapper from "@/views/shared/InputFieldWrapper";
import Select from "@/views/shared/antd/Select";

const SelectField = ({ label, errors, status, ...rest }: InputFieldProps) => {
  return (
    <InputFieldWrapper errors={errors} label={label}>
      <Select status={getInputStatus({ errors, status })} {...rest} />
    </InputFieldWrapper>
  );
};

export default SelectField;
