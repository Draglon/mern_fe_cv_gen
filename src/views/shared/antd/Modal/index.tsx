"use client";
import clsx from "clsx";
import { Modal as AntdModal } from "antd";
import type { ModalProps } from "antd";

const Modal = ({ className, children, ...rest }: ModalProps) => {
  return (
    <AntdModal open={true} className={clsx("modal", className)} {...rest}>
      {children}
    </AntdModal>
  );
};

export default Modal;
