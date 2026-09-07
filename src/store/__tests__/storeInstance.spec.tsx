import type { Persistor } from "redux-persist";

describe("storeInstance", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("throws an error when persistor is not initialized", async () => {
    const { getPersistor } = await import("../storeInstance");

    expect(() => getPersistor()).toThrow("Persistor is not initialized");
  });

  it("sets and returns persistor", async () => {
    const { getPersistor, setPersistor } = await import("../storeInstance");

    const persistor = {} as Persistor;

    setPersistor(persistor);

    expect(getPersistor()).toBe(persistor);
  });
});
