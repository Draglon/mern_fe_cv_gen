"use client";
import isPresent from "@/utils/isPresent";
import Select from "@/views/shared/antd/Select";
import { Text } from "@/views/shared/antd/Typography";

type SelectFieldProps = {
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    ref: any;
    type: string;
    message: string;
  };
};

const SelectField = ({ errors, status, ...rest }: SelectFieldProps) => {
  return (
    <div className="input-field">
      <Select status={isPresent(errors) ? "error" : status} {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default SelectField;
