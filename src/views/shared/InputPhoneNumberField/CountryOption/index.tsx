"use client";
import { getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import type { Country } from "react-phone-number-input";

type CountryOptionProps = {
  country: Country;
};

const CountryOption = ({ country }: CountryOptionProps) => {
  const Flag = flags[country];

  return (
    <div className="country-option">
      {Flag && (
        <figure className="country-option__country-flag">
          <Flag title={country} />
        </figure>
      )}

      <span className="country-option__calling-code">
        +{getCountryCallingCode(country)}
      </span>
    </div>
  );
};

export default CountryOption;
