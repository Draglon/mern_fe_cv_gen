"use client";
import clsx from "clsx";
import { Dropdown as AntdDropdown } from "antd";
import type { DropdownProps } from "antd";

const Dropdown = ({ className, children, ...restProps }: DropdownProps) => {
  return (
    <AntdDropdown
      className={clsx("dropdown", className)}
      trigger={["click"]}
      {...restProps}
    >
      {children}
    </AntdDropdown>
  );
};

export default Dropdown;
