"use client";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { Form } from "antd";

type FormItemType = {
  name: string | any[];
  controlName?: string;
  control?: any;
  className?: string;
  label?: string | null;
  Field?: any;
  mode?: string;
  type?: string;
  size?: string;
  placeholder?: string;
  register?: any;
  errors?: any;
  options?: { label: string; value: string }[];
  children?: React.ReactNode;
};

const FormItem = ({
  name,
  controlName,
  control,
  className,
  label = null,
  Field,
  children,
  ...restProps
}: FormItemType & { defaultCountry?: string }) => {
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
