import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalSkills from "@/store/personalSkills/operations/createPersonalSkills";
import updatePersonalSkills from "@/store/personalSkills/operations/updatePersonalSkills";
import { personalSkillsByLocaleSelector } from "@/store/personalSkills/selectors";

import PersonalSkillsForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalSkills/operations/createPersonalSkills");
jest.mock("@/store/personalSkills/operations/updatePersonalSkills");
const mockCreatePersonalSkills = jest.mocked(createPersonalSkills);
const mockUpdatePersonalSkills = jest.mocked(updatePersonalSkills);
jest.mock("@/store/personalSkills/selectors");
const mockPersonalSkillsByLocaleSelector = jest.mocked(
  personalSkillsByLocaleSelector
);

jest.mock("antd", () => ({
  Form: ({ children, onFinish, preserve, layout, ...props }: any) => (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        onFinish?.(event);
      }}
    >
      {children}
    </form>
  ),
  Space: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/views/shared/FormItem", () => {
  function MockFormItem({ controlName }: any) {
    return <div data-testid={controlName} />;
  }

  return MockFormItem;
});

jest.mock("@/views/shared/antd/FormList", () => {
  function MockFormList({ children }: any) {
    return <div>{children}</div>;
  }

  return MockFormList;
});

jest.mock("@/views/shared/antd/Button", () => {
  function MockButton({ htmlType, ...props }: any) {
    return <button type={htmlType} {...props} />;
  }

  return MockButton;
});

jest.mock("@/views/shared/InputField", () => {
  function MockInputField() {
    return <input />;
  }

  return MockInputField;
});

jest.mock("@/views/shared/InputNumberField", () => {
  function MockInputField() {
    return <input />;
  }

  return MockInputField;
});

jest.mock("@/views/shared/CheckboxField", () => ({
  __esModule: true,
  default: () => <input type="checkbox" />,
}));

describe("PersonalSkillsForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Skills",
        skills: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalSkillsByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      skills: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("skills-id");

    mockUseForm.mockReturnValue({
      control: {} as any,
      handleSubmit,
      formState: {} as any,
      reset: mockedReset,
      getValues: jest.fn(),
      watch: jest.fn().mockReturnValue(false),
    } as any);

    mockUseFieldArray.mockReturnValue({
      fields: [],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    dispatch.mockResolvedValue({});
  });

  it("calls reset with default values", () => {
    const defaultValues = {
      sectionTitle: "",
      skills: [],
    };

    render(<PersonalSkillsForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalSkillsByLocaleSelector).toHaveBeenCalledWith({}, "en");

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalSkills in edit mode", async () => {
    render(<PersonalSkillsForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-skills-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalSkills).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Skills",
          skills: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalSkills in create mode", async () => {
    render(<PersonalSkillsForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-skills-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalSkills).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Skills",
          skills: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalSkills when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        skills: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalSkillsForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-skills-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalSkills).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Skills",
          skills: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalSkills).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "skills"', () => {
    render(<PersonalSkillsForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "skills",
      })
    );
  });

  it("renders each hobby field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "skill-1" }, { id: "skill-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalSkillsForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByTestId("skills.0.skill")).toBeInTheDocument();
    expect(screen.getByTestId("skills.1.skill")).toBeInTheDocument();
  });

  it("calls remove with the correct index", () => {
    const remove = jest.fn();

    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "skill-1" }, { id: "skill-2" }],
      append: jest.fn(),
      remove,
    } as any);

    render(<PersonalSkillsForm resumeLocale="en" isEdit={false} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(remove).toHaveBeenCalledWith(0);
  });
});
