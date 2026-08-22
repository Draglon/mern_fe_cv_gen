import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalHobbies from "@/store/personalHobbies/operations/createPersonalHobbies";
import updatePersonalHobbies from "@/store/personalHobbies/operations/updatePersonalHobbies";
import { personalHobbiesByLocaleSelector } from "@/store/personalHobbies/selectors";

import PersonalHobbiesForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalHobbies/operations/createPersonalHobbies");
jest.mock("@/store/personalHobbies/operations/updatePersonalHobbies");
const mockCreatePersonalHobbies = jest.mocked(createPersonalHobbies);
const mockUpdatePersonalHobbies = jest.mocked(updatePersonalHobbies);
jest.mock("@/store/personalHobbies/selectors");
const mockPersonalHobbiesByLocaleSelector = jest.mocked(
  personalHobbiesByLocaleSelector
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

describe("PersonalHobbiesForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Hobbies",
        hobbies: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalHobbiesByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      hobbies: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("hobbies-id");

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
      hobbies: [],
    };

    render(<PersonalHobbiesForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalHobbiesByLocaleSelector).toHaveBeenCalledWith({}, "en");

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalHobbies in edit mode", async () => {
    render(<PersonalHobbiesForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-hobbies-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalHobbies).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Hobbies",
          hobbies: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalHobbies in create mode", async () => {
    render(<PersonalHobbiesForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-hobbies-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalHobbies).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Hobbies",
          hobbies: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalHobbies when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        hobbies: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalHobbiesForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-hobbies-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalHobbies).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Hobbies",
          hobbies: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalHobbies).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "hobbies"', () => {
    render(<PersonalHobbiesForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "hobbies",
      })
    );
  });

  it("renders each hobby field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "hobby-1" }, { id: "hobby-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalHobbiesForm resumeLocale="en" isEdit={false} />);

    expect(screen.getByTestId("hobbies.0.hobby")).toBeInTheDocument();
    expect(screen.getByTestId("hobbies.1.hobby")).toBeInTheDocument();
  });

  it("calls remove with the correct index", () => {
    const remove = jest.fn();

    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "hobby-1" }, { id: "hobby-2" }],
      append: jest.fn(),
      remove,
    } as any);

    render(<PersonalHobbiesForm resumeLocale="en" isEdit={false} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(remove).toHaveBeenCalledWith(0);
  });
});
