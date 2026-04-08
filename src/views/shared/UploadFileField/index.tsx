"use client";
import type { UploadFile as UploadFileProps } from "antd";

import UploadFile from "@/views/shared/antd/UploadFile";

type UploadFileFieldProps = {
  defaultValue: Array<UploadFileProps>;
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  };
};

const UploadFileField = ({
  defaultValue = [],
  errors,
  status,
  ...rest
}: UploadFileFieldProps) => {
  return (
    <div className="upload-file-field">
      <UploadFile fileList={defaultValue} {...rest} />
    </div>
  );
};

export default UploadFileField;
