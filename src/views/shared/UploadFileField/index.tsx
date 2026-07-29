"use client";
import type { UploadFile as UploadFileProps } from "antd";

import UploadFile from "@/views/shared/antd/UploadFile";

export type UploadFileFieldProps = {
  label?: string;
  value: Array<UploadFileProps>;
  errors?: {
    type: string;
    message: string;
  };
};

const UploadFileField = ({
  label,
  value,
  errors,
  ...rest
}: UploadFileFieldProps) => {
  return (
    <div className="upload-file-field">
      {label && <label className="upload-file-field__label">{label}</label>}
      <UploadFile fileList={value} {...rest} />
    </div>
  );
};

export default UploadFileField;
