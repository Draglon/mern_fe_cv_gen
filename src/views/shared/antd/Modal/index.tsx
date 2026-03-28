"use client";
import clsx from "clsx";
import { Modal as AntdModal } from "antd";
import type { ModalProps } from "antd";

const Modal = ({ classNames, children, ...rest }: ModalProps) => {
  return (
    <AntdModal
      open={true}
      className={clsx("modal", classNames)}
      data-testid="modal"
      {...rest}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
