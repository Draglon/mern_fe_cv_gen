import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalTools from "@/store/personalTools/operations/createPersonalTools";
import updatePersonalTools from "@/store/personalTools/operations/updatePersonalTools";
import { personalToolsByLocaleSelector } from "@/store/personalTools/selectors";

import PersonalToolsForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalTools/operations/createPersonalTools");
jest.mock("@/store/personalTools/operations/updatePersonalTools");
const mockCreatePersonalTools = jest.mocked(createPersonalTools);
const mockUpdatePersonalTools = jest.mocked(updatePersonalTools);
jest.mock("@/store/personalTools/selectors");
const mockPersonalToolsByLocaleSelector = jest.mocked(
  personalToolsByLocaleSelector
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

describe("PersonalToolsForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Tools",
        tools: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalToolsByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      tools: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("tools-id");

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
      tools: [],
    };

    render(<PersonalToolsForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalToolsByLocaleSelector).toHaveBeenCalledWith({}, "en");

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalTools in edit mode", async () => {
    render(<PersonalToolsForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-tools-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalTools).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Tools",
          tools: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalTools in create mode", async () => {
    render(<PersonalToolsForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-tools-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalTools).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Tools",
          tools: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalTools when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        tools: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalToolsForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-tools-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalTools).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Tools",
          tools: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalTools).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "tools"', () => {
    render(<PersonalToolsForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "tools",
      })
    );
  });

  it("renders each hobby field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "tool-1" }, { id: "tool-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalToolsForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByTestId("tools.0.tool")).toBeInTheDocument();
    expect(screen.getByTestId("tools.1.tool")).toBeInTheDocument();
  });

  it("calls remove with the correct index", () => {
    const remove = jest.fn();

    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "tool-1" }, { id: "tool-2" }],
      append: jest.fn(),
      remove,
    } as any);

    render(<PersonalToolsForm resumeLocale="en" isEdit={false} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(remove).toHaveBeenCalledWith(0);
  });
});
