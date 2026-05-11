"use client";
import clsx from "clsx";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  controlName: Path<T>;
  control: Control<T>;
  className?: string;
  label?: string;
  Field: React.ComponentType<any>;
  children?: React.ReactNode;
  [key: string]: any;
};

const FormItem = <T extends FieldValues>({
  controlName,
  control,
  className,
  label,
  Field,
  rules,
  ...restProps
}: Props<T>) => {
  return (
    <Controller
      name={controlName}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={clsx("form__item", className)}>
          {label && <label className="form__item-label">{label}</label>}

          <Field {...field} {...restProps} errors={fieldState.error} />
        </div>
      )}
    />
  );
};

export default FormItem;
