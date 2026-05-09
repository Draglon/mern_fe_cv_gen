"use client";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { DatePicker as AntdDatePicker } from "antd";
import type { DatePickerProps as AntdDatePickerProps } from "antd";
import type { Dayjs } from "dayjs";

import dayjs from "@/lib/dayjs";
import antdLocale from "@/lib/antdLocale";
import { DATE_PICKER_FORMAT, DATE_FORMAT } from "@/lib/constants/format";

type DatePickerProps = Omit<AntdDatePickerProps, "value" | "onChange"> & {
  value?: string | null;
  onChange?: (value: string | null) => void;
};

const DatePicker = ({
  className,
  value,
  onChange,
  ...rest
}: DatePickerProps) => {
  const locale = useLocale();

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
      locale={antdLocale(locale).DatePicker}
      format={DATE_PICKER_FORMAT}
      value={parsedValue}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DatePicker;
