"use client";
import clsx from "clsx";
import { Spin } from "antd";
import type { SpinProps } from "antd";

const Loader = ({ className, ...rest }: SpinProps) => {
  return (
    <Spin
      className={clsx("loader", className)}
      data-testid="loader"
      {...rest}
    />
  );
};

export default Loader;
