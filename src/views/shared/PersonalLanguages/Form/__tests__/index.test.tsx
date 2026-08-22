import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalLanguages from "@/store/personalLanguages/operations/createPersonalLanguages";
import updatePersonalLanguages from "@/store/personalLanguages/operations/updatePersonalLanguages";
import { personalLanguagesByLocaleSelector } from "@/store/personalLanguages/selectors";

import PersonalLanguagesForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalLanguages/operations/createPersonalLanguages");
jest.mock("@/store/personalLanguages/operations/updatePersonalLanguages");
const mockCreatePersonalLanguages = jest.mocked(createPersonalLanguages);
const mockUpdatePersonalLanguages = jest.mocked(updatePersonalLanguages);
jest.mock("@/store/personalLanguages/selectors");
const mockPersonalLanguagesByLocaleSelector = jest.mocked(
  personalLanguagesByLocaleSelector
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

describe("PersonalLanguagesForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Languages",
        languages: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalLanguagesByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      languages: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("languages-id");

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
      languages: [],
    };

    render(<PersonalLanguagesForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalLanguagesByLocaleSelector).toHaveBeenCalledWith(
      {},
      "en"
    );

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalLanguages in edit mode", async () => {
    render(<PersonalLanguagesForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-languages-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalLanguages).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Languages",
          languages: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalLanguages in create mode", async () => {
    render(<PersonalLanguagesForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-languages-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalLanguages).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Languages",
          languages: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalLanguages when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        languages: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalLanguagesForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-languages-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalLanguages).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Languages",
          languages: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalLanguages).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "languages"', () => {
    render(<PersonalLanguagesForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "languages",
      })
    );
  });

  it("renders each hobby field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "language-1" }, { id: "language-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalLanguagesForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByTestId("languages.0.language")).toBeInTheDocument();
    expect(screen.getByTestId("languages.1.language")).toBeInTheDocument();
  });

  it("calls remove with the correct index", () => {
    const remove = jest.fn();

    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "language-1" }, { id: "language-2" }],
      append: jest.fn(),
      remove,
    } as any);

    render(<PersonalLanguagesForm resumeLocale="en" isEdit={false} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(remove).toHaveBeenCalledWith(0);
  });
});
