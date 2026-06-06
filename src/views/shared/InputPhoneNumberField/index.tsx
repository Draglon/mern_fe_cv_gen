"use client";

import { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
} from "react-phone-number-input";
import type { Country } from "react-phone-number-input";

import { DEFAULT_PHONE_NUMBER_LOCALE } from "@/lib/constants/locales";
import isPresent from "@/utils/isPresent";

import Select from "@/views/shared/antd/Select";
import Input from "@/views/shared/antd/Input";
import { Text } from "@/views/shared/antd/Typography";

import CountryOption from "./CountryOption";

type InputPhoneNumberFieldProps = {
  label?: string;
  errors?: {
    type: string;
    message: string;
  };
  status?: "error" | "warning";
  value?: string;
  defaultCountry?: Country;
  onChange: (value?: string) => void;
};

const InputPhoneNumberField = ({
  label,
  value = "",
  defaultCountry = DEFAULT_PHONE_NUMBER_LOCALE,
  errors,
  status,
  onChange,
}: InputPhoneNumberFieldProps) => {
  const tShared = useTranslations("shared");
  const [country, setCountry] = useState<Country>(() => {
    const parsed = value ? parsePhoneNumber(value) : undefined;
    return parsed?.country || defaultCountry;
  });
  const [nationalNumber, setNationalNumber] = useState(() => {
    const parsed = value ? parsePhoneNumber(value) : undefined;
    return parsed?.nationalNumber || "";
  });
  const COUNTRY_OPTIONS = useMemo(
    () =>
      getCountries().map((country) => ({
        value: country,
        label: <CountryOption country={country} />,
      })),
    []
  );

  useEffect(() => {
    if (!value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNationalNumber("");
      return;
    }

    const parsed = parsePhoneNumber(value);

    if (!parsed) return;

    setCountry(parsed.country || defaultCountry);
    setNationalNumber(parsed.nationalNumber);
  }, [value, defaultCountry]);

  const handleChange = (val: string) => {
    setNationalNumber(val);

    if (!val) {
      onChange(undefined);
      return;
    }

    const code = getCountryCallingCode(country);
    onChange(`+${code}${val}`);
  };

  const handleCountryChange = (newCountry: Country) => {
    setCountry(newCountry);

    if (!nationalNumber) return;

    const code = getCountryCallingCode(newCountry);

    onChange(`+${code}${nationalNumber}`);
  };

  return (
    <div className="input-phone-number-field">
      {label && (
        <label className="input-phone-number-field__label">{label}</label>
      )}

      <div className="input-phone-number-field__phone">
        <div className="input-phone-number-field__country-code">
          <Select
            value={country}
            onChange={handleCountryChange}
            options={COUNTRY_OPTIONS}
          />
        </div>
        <div className="input-phone-number-field__number">
          <Input
            value={nationalNumber}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={tShared("form.inputPhoneNumber.placeholder")}
            status={isPresent(errors) ? "error" : status}
          />
          {errors?.message && (
            <Text className="input-phone-number-field__error">
              {errors.message}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPhoneNumberField;
