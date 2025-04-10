"use client";
import clsx from "clsx";
import { Switch as AntdSwitch } from "antd";
import type { SwitchProps } from "antd";

const Switch = ({ className, rootClassName, ...rest }: SwitchProps) => {
  return (
    <AntdSwitch
      className={clsx("switch", className)}
      rootClassName={clsx("switch-root", rootClassName)}
      {...rest}
    />
  );
};

export default Switch;
