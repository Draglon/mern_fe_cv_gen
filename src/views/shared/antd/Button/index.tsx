"use client";
import clsx from "clsx";
import { Button as AntdButton } from "antd";
import type { ButtonProps } from "antd";

const Button = ({
  className,
  color = "primary",
  type = "primary",
  size = "middle",
  htmlType = "button",
  children,
  ...rest
}: ButtonProps) => {
  const classNames = clsx(
    "button",
    {
      "button--primary": color === "primary",
      "button--danger": color === "danger",
      "button--default": color === "default",
    },
    className
  );

  return (
    <AntdButton
      className={classNames}
      color={color}
      type={type}
      size={size}
      htmlType={htmlType}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
