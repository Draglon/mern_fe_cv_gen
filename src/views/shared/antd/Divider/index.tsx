"use client";
import clsx from "clsx";
import { Divider as AntdDivider } from "antd";
import type { DividerProps } from "antd";

const Divider = ({ className, ...props }: DividerProps) => {
  return <AntdDivider className={clsx("divider", className)} {...props} />;
};

export default Divider;
