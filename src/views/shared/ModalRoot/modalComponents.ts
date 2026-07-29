import type { ComponentType } from "react";

import ConfirmModal from "@/views/shared/ConfirmModal";
import DeleteAccountModal from "@/views/Settings/DeleteAccount/DeleteAccountModal";

const MODAL_COMPONENTS: Record<string, ComponentType<any>> = {
  CONFIRM_MODAL: ConfirmModal,
  DELETE_ACCOUNT_MODAL: DeleteAccountModal,
};

export default MODAL_COMPONENTS;
