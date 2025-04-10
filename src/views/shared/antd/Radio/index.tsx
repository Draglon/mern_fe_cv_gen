"use client";
import clsx from "clsx";
import { Radio as AntdRadio } from "antd";
import type { RadioProps } from "antd";

const Radio = ({ className, children, ...rest }: RadioProps) => {
  return (
    <AntdRadio className={clsx("checkbox", className)} {...rest}>
      {children}
    </AntdRadio>
  );
};

export default Radio;
