"use client";
import isPresent from "@/utils/isPresent";
import DatePicker from "@/views/shared/antd/DatePicker";
import { Text } from "@/views/shared/antd/Typography";

type DatePickerFieldProps = {
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
};

const DatePickerField = ({ errors, status, ...rest }: DatePickerFieldProps) => {
  return (
    <div className="input-field">
      <DatePicker status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default DatePickerField;
