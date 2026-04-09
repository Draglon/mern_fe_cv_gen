"use client";
import clsx from "clsx";
import { Controller, Control, FieldError } from "react-hook-form";
import { Form } from "antd";
import type { FormItemProps } from "antd";

type FormItemType = {
  name: string | any[];
  controlName?: string;
  control?: Control<any>;
  className?: string;
  label?: string;
  mode?: string;
  type?: string;
  size?: string;
  defaultCountry?: string;
  placeholder?: string;
  errors?: FieldError;
  register?: any;
  options?: { label: string; value: string }[];
  Field?: any;
  children?: React.ReactNode;
};

const FormItem = ({
  name,
  controlName,
  control,
  className,
  label,
  Field,
  children,
  ...restProps
}: FormItemProps & FormItemType) => {
  return children ? (
    <Form.Item
      name={name}
      label={label}
      className={clsx("form__item", className)}
    >
      {children}
    </Form.Item>
  ) : (
    <Controller
      name={controlName || ""}
      control={control}
      render={({ field }) => (
        <Form.Item
          name={name}
          className={clsx("form__item", className)}
          label={label}
        >
          <Field {...restProps} {...field} defaultValue={field.value} />
        </Form.Item>
      )}
    />
  );
};

export default FormItem;
