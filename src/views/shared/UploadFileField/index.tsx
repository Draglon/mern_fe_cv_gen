"use client";
import type { UploadFile as UploadFileProps } from "antd";

import UploadFile from "@/views/shared/antd/UploadFile";

type UploadFileFieldProps = {
  value: Array<UploadFileProps>;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
};

const UploadFileField = ({
  value,
  errors,
  status,
  ...rest
}: UploadFileFieldProps) => {
  return (
    <div className="upload-file-field">
      <UploadFile fileList={value} {...rest} />
    </div>
  );
};

export default UploadFileField;
