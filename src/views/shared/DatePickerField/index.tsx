"use client";
import isPresent from "@/utils/isPresent";
import DatePicker from "@/views/shared/antd/DatePicker";
import { Text } from "@/views/shared/antd/Typography";

type DatePickerFieldProps = {
  label?: string;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
};

const DatePickerField = ({
  label,
  errors,
  status,
  ...rest
}: DatePickerFieldProps) => {
  return (
    <div className="input-field">
      {label && <label className="input-field__label">{label}</label>}
      <DatePicker status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default DatePickerField;
