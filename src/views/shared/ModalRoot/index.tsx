"use client";
import { useAppSelector } from "@/store/hooks";
import { modalSelector } from "@/store/modal/selectors";

import MODAL_COMPONENTS from "./modalComponents";

const ModalRoot = () => {
  const { modalType, modalProps } = useAppSelector(modalSelector);

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default ModalRoot;
