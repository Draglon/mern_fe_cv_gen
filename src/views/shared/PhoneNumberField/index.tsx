"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import type { Country } from "react-phone-number-input";

import { DEFAULT_PHONE_NUMBER_LOCALE } from "@/lib/constants/locales";
import Select from "@/views/shared/antd/Select";
import Input from "@/views/shared/antd/Input";
import { Text } from "@/views/shared/antd/Typography";

type PhoneNumberFieldProps = {
  label?: string;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
  value?: string;
  defaultCountry?: Country;
  onChange: (value?: string) => void;
};

const PhoneNumberField = ({
  label,
  value = "",
  defaultCountry = DEFAULT_PHONE_NUMBER_LOCALE,
  errors,
  onChange,
}: PhoneNumberFieldProps) => {
  const parsed = value ? parsePhoneNumber(value) : undefined;

  const [country, setCountry] = useState<Country>(
    parsed?.country || defaultCountry
  );

  const [nationalNumber, setNationalNumber] = useState(
    parsed?.nationalNumber || ""
  );

  useEffect(() => {
    if (!value) return;

    const parsed = parsePhoneNumber(value);
    if (!parsed) return;

    setCountry(parsed.country || defaultCountry);
    setNationalNumber(parsed.nationalNumber || "");
  }, []);

  const handleChange = (val: string) => {
    setNationalNumber(val);

    if (!val) {
      onChange(undefined);
      return;
    }

    const code = getCountryCallingCode(country);
    onChange(`+${code}${val}`);
  };

  return (
    <div className="input-field">
      {label && <label className="input-field__label">{label}</label>}

      <div className="phone-field">
        <div className="phone-field__left">
          <Select
            value={country}
            onChange={(value: Country) => setCountry(value)}
            options={getCountries().map((c) => {
              const Flag = flags[c];

              return {
                value: c,
                label: (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {Flag && (
                      <Flag title={c} style={{ width: 20, height: 14 }} />
                    )}

                    <span>{c}</span>

                    <span style={{ opacity: 0.6 }}>
                      +{getCountryCallingCode(c)}
                    </span>
                  </div>
                ),
              };
            })}
          />
        </div>

        <Input
          className={clsx("phone-field__input")}
          value={nationalNumber}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Phone number"
        />
      </div>

      {errors?.message && (
        <Text className="input-field__error">{errors.message}</Text>
      )}
    </div>
  );
};

export default PhoneNumberField;
