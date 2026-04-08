"use client";
import clsx from "clsx";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import type { Country, Value } from "react-phone-number-input";

import isPresent from "@/utils/isPresent";
import { Text } from "@/views/shared/antd/Typography";

type PhoneNumberFieldProps = {
  defaultValue?: string | Value;
  defaultCountry?: Country;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
  onChange: () => string;
};

const PhoneNumberField = ({
  defaultValue = "",
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
        value={formatPhoneNumberIntl(defaultValue).replaceAll(" ", "")}
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
