import { RESUME_KEYS, RESUME_ITEMS, DEFAULT_RESUME_ITEM } from "../resume";

jest.mock("@/views/shared/PersonalInfo", () => () => null);
jest.mock("@/views/shared/PersonalHobbies", () => () => null);
jest.mock("@/views/shared/PersonalLanguages", () => () => null);
jest.mock("@/views/shared/PersonalExperience", () => () => null);
jest.mock("@/views/shared/PersonalEducation", () => () => null);
jest.mock("@/views/shared/PersonalCourses", () => () => null);
jest.mock("@/views/shared/PersonalSkills", () => () => null);
jest.mock("@/views/shared/PersonalTools", () => () => null);

describe("resume config", () => {
  it("contains all resume keys", () => {
    expect(RESUME_KEYS).toEqual([
      "general",
      "hobbies",
      "languages",
      "experience",
      "education",
      "courses",
      "skills",
      "tools",
    ]);
  });

  it("has default resume item", () => {
    expect(DEFAULT_RESUME_ITEM).toBe("general");
  });

  it("contains resume items for every key", () => {
    expect(RESUME_ITEMS).toHaveLength(RESUME_KEYS.length);

    expect(RESUME_ITEMS.map(({ key }) => key)).toEqual(RESUME_KEYS);
  });

  it("every resume item has a component", () => {
    RESUME_ITEMS.forEach(({ Component }) => {
      expect(Component).toBeDefined();
      expect(typeof Component).toBe("function");
    });
  });

  it("contains unique keys", () => {
    const keys = RESUME_ITEMS.map(({ key }) => key);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("contains the default item", () => {
    expect(RESUME_ITEMS.some(({ key }) => key === DEFAULT_RESUME_ITEM)).toBe(
      true
    );
  });
});
