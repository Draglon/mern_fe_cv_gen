"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/store/hooks";
import { hideModal as hideModalAction } from "@/store/modal/actions";
import Modal from "@/views/shared/antd/Modal";

type ModalProps = {
  okText?: string;
  cancelText?: string;
  onConfirm?: any;
  content?: ReactNode;
  modalProps?: any;
};

const ConfirmModal = ({
  okText,
  cancelText,
  onConfirm,
  content,
  ...modalProps
}: ModalProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations("shared");

  const hideModalHandle = () => {
    dispatch(hideModalAction());
  };

  return (
    <Modal
      okText={okText || t("confirm")}
      cancelText={cancelText || t("cancel")}
      onOk={onConfirm || hideModalHandle}
      onCancel={hideModalHandle}
      {...modalProps}
    >
      {content}
    </Modal>
  );
};

export default ConfirmModal;
