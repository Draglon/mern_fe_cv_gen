"use client";
import clsx from "clsx";
import { Select as AntdSelect } from "antd";
import type { SelectProps } from "antd";

const Select = ({
  rootClassName,
  popupClassName,
  options = [],
  ...rest
}: SelectProps) => {
  return (
    <AntdSelect
      rootClassName={clsx("select", rootClassName)}
      popupClassName={clsx("select__popup", popupClassName)}
      options={options}
      {...rest}
    />
  );
};

export default Select;
