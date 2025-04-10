"use client";
import clsx from "clsx";
import { Spin } from "antd";
import type { SpinProps } from "antd";

const Loader = ({
  className,
  delay,
  fullscreen,
  indicator,
  percent,
  size,
  spinning,
}: SpinProps) => {
  return (
    <Spin
      className={clsx("loader", className)}
      delay={delay}
      fullscreen={fullscreen}
      indicator={indicator}
      percent={percent}
      size={size}
      spinning={spinning}
    />
  );
};

export default Loader;
