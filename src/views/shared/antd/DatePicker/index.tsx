"use client";
import clsx from "clsx";
import { DatePicker as AntdDatePicker } from "antd";
import type { DatePickerProps as AntdDatePickerProps } from "antd";
import type { Dayjs } from "dayjs";

import dayjs from "@/lib/dayjs";
import antdLocale from "@/lib/antdLocale";
import { DATE_PICKER_FORMAT, DATE_FORMAT } from "@/lib/constants/format";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";

type DatePickerProps = Omit<AntdDatePickerProps, "value" | "onChange"> & {
  value?: string | null;
  locale?: string;
  onChange?: (value: string | null) => void;
};

const DatePicker = ({
  className,
  value,
  locale,
  onChange,
  ...rest
}: DatePickerProps) => {
  const currentLocale = locale || DEFAULT_LOCALE;

  const parsedValue: Dayjs | null =
    value && dayjs(value).isValid() ? dayjs(value) : null;

  const handleChange: AntdDatePickerProps["onChange"] = (date) => {
    if (!date || Array.isArray(date)) {
      onChange?.(null);
      return;
    }

    onChange?.(date.format(DATE_FORMAT));
  };

  return (
    <AntdDatePicker
      className={clsx("date-picker", className)}
      locale={antdLocale(currentLocale).DatePicker}
      format={DATE_PICKER_FORMAT}
      value={parsedValue}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DatePicker;
