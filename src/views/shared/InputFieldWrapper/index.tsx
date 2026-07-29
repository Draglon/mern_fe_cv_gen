"use client";
import React from "react";

import { Text } from "@/views/shared/antd/Typography";

type InputFieldProps = {
  label?: string;
  errors?: {
    type: string;
    message: string;
  };
  children: React.ReactNode;
};

const InputFieldWrapper = ({ label, errors, children }: InputFieldProps) => {
  return (
    <div className="input-field" data-testid="input-field">
      {label && (
        <label className="input-field__label" data-testid="input-field-label">
          {label}
        </label>
      )}
      {children}
      {errors?.message && (
        <Text className="input-field__error" data-testid="input-field-error">
          {errors?.message}
        </Text>
      )}
    </div>
  );
};

export default InputFieldWrapper;
