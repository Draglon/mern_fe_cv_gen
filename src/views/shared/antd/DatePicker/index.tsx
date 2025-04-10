"use client";
import clsx from "clsx";
import { DatePicker as AntdDatePicker } from "antd";
import type { DatePickerProps } from "antd";

const DatePicker = ({ className, ...rest }: DatePickerProps) => {
  return (
    <AntdDatePicker className={clsx("data-picker", className)} {...rest} />
  );
};

export default DatePicker;
