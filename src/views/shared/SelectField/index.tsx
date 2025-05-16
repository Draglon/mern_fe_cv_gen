"use client";
import Select from "@/views/shared/antd/Select";
import { Text } from "@/views/shared/antd/Typography";

type SelectFieldProps = {
  errors?: {
    ref: any;
    type: string;
    message: string;
  };
};

const SelectField = ({ errors, ...rest }: SelectFieldProps) => {
  return (
    <div className="input-field">
      <Select {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default SelectField;
