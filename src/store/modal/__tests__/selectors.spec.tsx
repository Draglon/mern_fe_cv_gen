import { RootState } from "@/store/store";
import { modalSelector } from "../selectors";

describe("modalSelector", () => {
  it("returns modal state", () => {
    const modal = {
      modalType: "testModal",
      modalProps: { id: 1 },
    };

    const state = { modal } as RootState;

    expect(modalSelector(state)).toBe(modal);
  });
});
