import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
