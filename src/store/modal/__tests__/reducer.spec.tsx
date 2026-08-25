import reducer, { modalSlice } from "../reducer";

const initialState = {
  modalType: null,
  modalProps: {},
};

describe("modalSlice", () => {
  it("showModal sets modalType and modalProps", () => {
    const state = reducer(
      initialState,
      modalSlice.actions.showModal({
        modalType: "testModal",
        modalProps: { id: 1 },
      })
    );

    expect(state).toEqual({
      modalType: "testModal",
      modalProps: { id: 1 },
    });
  });

  it("showModal sets modalProps to undefined when it is not provided", () => {
    const state = reducer(
      initialState,
      modalSlice.actions.showModal({
        modalType: "testModal",
      })
    );

    expect(state).toEqual({
      modalType: "testModal",
      modalProps: undefined,
    });
  });

  it("hideModal resets modal state", () => {
    const state = reducer(
      {
        modalType: "testModal",
        modalProps: { id: 1 },
      },
      modalSlice.actions.hideModal()
    );

    expect(state).toEqual({
      modalType: null,
      modalProps: {},
    });
  });
});
