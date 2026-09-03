import stopPropagation from "../stopPropagation";

describe("stopPropagation", () => {
  it("calls stopPropagation on event", () => {
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as React.MouseEvent;

    stopPropagation(event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
