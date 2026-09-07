import { render, screen } from "@testing-library/react";

import StoreProvider from "../StoreProvider";

jest.mock("../store", () => ({
  makeStore: jest.fn(),
}));

jest.mock("../storeInstance", () => ({
  setPersistor: jest.fn(),
}));

jest.mock("redux-persist", () => ({
  persistStore: jest.fn(),
}));

jest.mock("react-redux", () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="provider">{children}</div>
  ),
}));

jest.mock("redux-persist/integration/react", () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="persist-gate">{children}</div>
  ),
}));

import { makeStore } from "../store";
import { setPersistor } from "../storeInstance";
import { persistStore } from "redux-persist";

describe("StoreProvider", () => {
  const store = {};
  const persistor = {};

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(makeStore).mockReturnValue(store as never);
    jest.mocked(persistStore).mockReturnValue(persistor as never);
  });

  it("renders children", () => {
    render(
      <StoreProvider>
        <div>Test child</div>
      </StoreProvider>
    );

    expect(screen.getByText("Test child")).toBeInTheDocument();
  });

  it("creates store and persistor", () => {
    render(
      <StoreProvider>
        <div>Test child</div>
      </StoreProvider>
    );

    expect(makeStore).toHaveBeenCalledTimes(1);
    expect(persistStore).toHaveBeenCalledTimes(1);
    expect(persistStore).toHaveBeenCalledWith(store);
  });

  it("sets persistor", () => {
    render(
      <StoreProvider>
        <div>Test child</div>
      </StoreProvider>
    );

    expect(setPersistor).toHaveBeenCalledTimes(1);
    expect(setPersistor).toHaveBeenCalledWith(persistor);
  });

  it("does not recreate store and persistor on rerender", () => {
    const { rerender } = render(
      <StoreProvider>
        <div>Test child</div>
      </StoreProvider>
    );

    rerender(
      <StoreProvider>
        <div>Updated child</div>
      </StoreProvider>
    );

    expect(makeStore).toHaveBeenCalledTimes(1);
    expect(persistStore).toHaveBeenCalledTimes(1);
    expect(setPersistor).toHaveBeenCalledTimes(1);
  });
});
