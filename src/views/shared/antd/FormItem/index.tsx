"use client";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { Form } from "antd";

type FormItemType = {
  name: string | any[];
  controlName?: string;
  control?: any;
  type?: string;
  size?: string;
  className?: string;
  fieldClassName?: string;
  label?: string | null;
  placeholder?: string;
  register?: any;
  errors?: any;
  Field?: any;
  fieldType?: string;
  mode?: string;
  options?: { label: string; value: string }[];
  children?: React.ReactNode;
};

const FormItem = ({
  name,
  controlName,
  control,
  className,
  fieldClassName,
  label = null,
  register,
  errors,
  Field,
  fieldType = "text",
  children,
  ...restProps
}: FormItemType) => {
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
      render={({ field: { onChange, value } }) => (
        <Form.Item
          name={name}
          className={clsx("form__item", className)}
          label={label}
        >
          {fieldType === "text" && (
            <Field
              {...register}
              className={fieldClassName}
              onChange={onChange}
              value={value}
              defaultValue={value}
              errors={errors}
              {...restProps}
            />
          )}
          {fieldType === "upload" && (
            <Field
              className={fieldClassName}
              onChange={onChange}
              fileList={value}
              errors={errors}
              {...restProps}
            />
          )}
          {fieldType === "textarea" && (
            <Field
              className={fieldClassName}
              onChange={onChange}
              value={value}
              defaultValue={value}
              errors={errors}
              {...restProps}
            />
          )}
          {fieldType === "checkbox" && (
            <Field
              className={fieldClassName}
              onChange={onChange}
              defaultChecked={value}
              errors={errors}
              {...restProps}
            />
          )}
        </Form.Item>
      )}
    />
  );
};

export default FormItem;
