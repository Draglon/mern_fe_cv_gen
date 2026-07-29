"use client";
import Checkbox from "@/views/shared/antd/Checkbox";

type ConfirmModalProps = {
  label?: string;
};

const ConfirmModal = ({ label, ...rest }: ConfirmModalProps) => {
  return (
    <div className="checkbox-field">
      <Checkbox {...rest}>{label}</Checkbox>
    </div>
  );
};

export default ConfirmModal;
