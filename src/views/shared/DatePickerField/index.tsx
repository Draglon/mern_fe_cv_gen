"use client";
import getInputStatus from "@/utils/getInputStatus";
import { InputFieldProps } from "@/lib/constants/props/forms/inputField";

import InputFieldWrapper from "@/views/shared/InputFieldWrapper";
import DatePicker from "@/views/shared/antd/DatePicker";

const DatePickerField = ({
  label,
  errors,
  status,
  ...rest
}: InputFieldProps) => {
  return (
    <InputFieldWrapper errors={errors} label={label}>
      <DatePicker status={getInputStatus({ errors, status })} {...rest} />
    </InputFieldWrapper>
  );
};

export default DatePickerField;
