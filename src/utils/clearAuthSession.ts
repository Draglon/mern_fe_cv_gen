import { AppDispatch } from "@/store/store";

import { getPersistor } from "@/store/storeInstance";
import { logout as logoutAction } from "@/store/auth/actions";

const clearAuthSession = async (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  await getPersistor().purge();
  dispatch(logoutAction());
};

export default clearAuthSession;