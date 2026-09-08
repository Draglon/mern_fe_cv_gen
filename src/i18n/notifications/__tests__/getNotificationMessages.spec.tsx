import { getNotificationMessages } from "../getNotificationMessages";

describe("getNotificationMessages", () => {
  it("returns notification messages for English locale", async () => {
    const result = await getNotificationMessages("en", "profile", "update");

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("error");
    expect(result.success).not.toBe("notifications.profile.update.success");
    expect(result.error).not.toBe("notifications.profile.update.error");
  });

  it("normalizes locale with region", async () => {
    const result = await getNotificationMessages("en-US", "profile", "update");

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("error");
    expect(result.success).not.toBe("notifications.profile.update.success");
    expect(result.error).not.toBe("notifications.profile.update.error");
  });

  it("returns notification messages for Russian locale", async () => {
    const result = await getNotificationMessages("ru", "profile", "update");

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("error");
  });

  it("returns notification messages for Ukrainian locale", async () => {
    const result = await getNotificationMessages("ua", "profile", "update");

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("error");
  });

  it("returns the key when translation is missing", async () => {
    const result = await getNotificationMessages("en", "unknown", "unknown");

    expect(result).toEqual({
      success: "notifications.unknown.unknown.success",
      error: "notifications.unknown.unknown.error",
    });
  });
});
