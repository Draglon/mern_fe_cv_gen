"use client";
import clsx from "clsx";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import type { Country } from "react-phone-number-input";

import isPresent from "@/utils/isPresent";
import { Text } from "@/views/shared/antd/Typography";

type PhoneNumberFieldProps = {
  defaultValue?: string;
  onChange: any;
  defaultCountry?: Country;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    ref: any;
    type: string;
    message: string;
  };
};

const PhoneNumberField = ({
  defaultValue,
  defaultCountry,
  errors,
  status,
  onChange,
}: PhoneNumberFieldProps) => {
  const classNames = clsx("input-phone-number", {
    "input-phone-number--error": isPresent(errors) ? "error" : status,
    "input-phone-number--success": "",
  });

  return (
    <div className="input-field">
      <PhoneInput
        className={classNames}
        value={defaultValue}
        flags={flags}
        defaultCountry={defaultCountry}
        onChange={onChange}
      />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default PhoneNumberField;
