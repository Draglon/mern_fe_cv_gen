"use client";
import clsx from "clsx";
import type { FormProps } from "antd";
import { Form as AntdForm } from "antd";

type FormType = {
  className?: string;
  children: React.ReactNode;
};

const Form = ({ className, children, ...restProps }: FormProps & FormType) => {
  return (
    <AntdForm className={clsx("form", className)} {...restProps}>
      {children}
    </AntdForm>
  );
};

export default Form;
