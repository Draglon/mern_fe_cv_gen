import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  modalType: string | null,
  modalProps?: unknown;
}

const initialState: IModalState = {
  modalType: null,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.modalType = payload.modalType;
      state.modalProps = payload?.modalProps;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.modalProps = {};
    },
  },
});

export default modalSlice.reducer;
