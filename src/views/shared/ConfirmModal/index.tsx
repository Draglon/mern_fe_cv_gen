"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/store/hooks";
import { hideModal as hideModalAction } from "@/store/modal/actions";

import Modal from "@/views/shared/antd/Modal";

type ConfirmModalProps = {
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  content?: ReactNode;
};

const ConfirmModal = ({
  okText,
  cancelText,
  onConfirm,
  content,
  ...modalProps
}: ConfirmModalProps) => {
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
