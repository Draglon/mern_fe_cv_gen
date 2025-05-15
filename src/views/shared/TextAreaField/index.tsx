"use client";
import TextArea from "@/views/shared/antd/TextArea";
import { Text } from "@/views/shared/antd/Typography";

type TextAreaFieldProps = {
  errors?: {
    ref: any;
    type: string;
    message: string;
  };
};

const TextAreaField = ({ errors, ...rest }: TextAreaFieldProps) => {
  return (
    <div className="input-field">
      <TextArea {...rest} />
      {errors?.message && (
        <Text className="input-field__error">{errors?.message}</Text>
      )}
    </div>
  );
};

export default TextAreaField;
