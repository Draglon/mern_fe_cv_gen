"use client";
import Checkbox from "@/views/shared/antd/Checkbox";

type CheckboxFieldProps = {
  label?: string;
};

const CheckboxField = ({ label, ...rest }: CheckboxFieldProps) => {
  return (
    <div className="checkbox-field">
      <Checkbox {...rest}>{label}</Checkbox>
    </div>
  );
};

export default CheckboxField;
