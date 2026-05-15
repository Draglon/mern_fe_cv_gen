"use client";
import Checkbox from "@/views/shared/antd/Checkbox";

type CheckboxFieldProps = {
  label?: string;
};

const CheckboxField = ({ label, ...rest }: CheckboxFieldProps) => {
  return (
    <div className="checkbox-field">
      <Checkbox {...rest} />
      {label && <label className="checkbox-field__label">{label}</label>}
    </div>
  );
};

export default CheckboxField;
