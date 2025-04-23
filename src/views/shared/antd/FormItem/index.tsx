"use client";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { Form } from "antd";

// type RulesType = {
//   required?: boolean;
//   len?: number;
//   min?: number;
//   max?: number;
//   pattern?: RegExp;
//   type?: string;
//   message: string;
// };

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
  rules?: any[];
  Field?: any;
  fieldType?: string;
  register?: any;
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
  rules,
  Field,
  fieldType = "text",
  children,
  register,
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
          rules={rules}
        >
          <>
            {fieldType === "text" && (
              <Field
                className={fieldClassName}
                onChange={onChange}
                value={value}
                defaultValue={value}
                register={{ ...register }}
                {...restProps}
              />
            )}
            {fieldType === "upload" && (
              <Field
                className={fieldClassName}
                onChange={onChange}
                fileList={value}
                {...restProps}
              />
            )}
            {fieldType === "textarea" && (
              <Field
                className={fieldClassName}
                onChange={onChange}
                value={value}
                defaultValue={value}
                {...restProps}
              />
            )}
            {fieldType === "checkbox" && (
              <Field
                className={fieldClassName}
                onChange={onChange}
                defaultChecked={value}
                register={{ ...register }}
                {...restProps}
              />
            )}
          </>
        </Form.Item>
      )}
    />
  );
};

export default FormItem;
