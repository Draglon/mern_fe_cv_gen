import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalEducation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducation from "@/store/personalEducation/operations/updatePersonalEducation";
import { personalEducationByLocaleSelector } from "@/store/personalEducation/selectors";

import PersonalEducationForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalEducation/operations/createPersonalEducation");
jest.mock("@/store/personalEducation/operations/updatePersonalEducation");
const mockUpdatePersonalEducation = jest.mocked(updatePersonalEducation);
const mockCreatePersonalEducation = jest.mocked(createPersonalEducation);
jest.mock("@/store/personalEducation/selectors");
const mockPersonalEducationByLocaleSelector = jest.mocked(
  personalEducationByLocaleSelector
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
}));

jest.mock("@/views/shared/FormItem", () => {
  function MockFormItem() {
    return <div />;
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

jest.mock("../Item", () => {
  function MockFormItem() {
    return <div data-testid="education-form-item" />;
  }

  return MockFormItem;
});

describe("PersonalEducationForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Education",
        education: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalEducationByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      education: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("education-id");

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
      education: [],
    };

    render(<PersonalEducationForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalEducationByLocaleSelector).toHaveBeenCalledWith(
      {},
      "en"
    );

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalEducation in edit mode", async () => {
    render(<PersonalEducationForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-education-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalEducation).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Education",
          education: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalEducation in create mode", async () => {
    render(<PersonalEducationForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-education-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalEducation).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Education",
          education: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalEducation when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        education: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalEducationForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-education-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalEducation).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Education",
          education: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalEducation).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "education"', () => {
    render(<PersonalEducationForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "education",
      })
    );
  });

  it("renders PersonalEducationFormItem for each education field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "education-1" }, { id: "education-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalEducationForm resumeLocale="en" isEdit={false} />);

    expect(screen.getAllByTestId("education-form-item")).toHaveLength(2);
  });
});
