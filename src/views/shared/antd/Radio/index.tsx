"use client";
import clsx from "clsx";
import { Radio as AntdRadio } from "antd";
import type { RadioProps } from "antd";

const Radio = ({ className, children, ...rest }: RadioProps) => {
  return (
    <AntdRadio
      className={clsx("radio", className)}
      data-testid="inputRadio"
      {...rest}
    >
      {children}
    </AntdRadio>
  );
};

export default Radio;
