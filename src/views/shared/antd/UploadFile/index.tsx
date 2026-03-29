"use client";
import clsx from "clsx";
import { Upload as AntdUpload } from "antd";
import type { UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { isEmpty } from "ramda";

import convertBase64ToFile from "@/utils/convertBase64ToFile";

const UploadFileComponent = ({
  name,
  className,
  maxCount = 1,
  listType = "picture-circle",
  disabled = false,
  fileList = [],
  onChange,
}: UploadProps) => {
  const initialFileList: any =
    !isEmpty(fileList) && typeof fileList[0] === "string"
      ? convertBase64ToFile(fileList)
      : fileList;

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    // @ts-expect-error:next-line
    onChange?.(newFileList);
  };

  return (
    <ImgCrop rotationSlider>
      <AntdUpload
        name={name}
        className={clsx("upload-file", className)}
        listType={listType}
        fileList={initialFileList}
        onChange={handleChange}
        disabled={disabled}
        maxCount={maxCount}
      >
        {fileList.length < maxCount && "Upload"}
      </AntdUpload>
    </ImgCrop>
  );
};

export default UploadFileComponent;
