import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalExperience from "@/store/personalExperience/operations/createPersonalExperience";
import updatePersonalExperience from "@/store/personalExperience/operations/updatePersonalExperience";
import { personalExperienceByLocaleSelector } from "@/store/personalExperience/selectors";

import PersonalExperienceForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalExperience/operations/createPersonalExperience");
jest.mock("@/store/personalExperience/operations/updatePersonalExperience");
const mockUpdatePersonalExperience = jest.mocked(updatePersonalExperience);
const mockCreatePersonalExperience = jest.mocked(createPersonalExperience);
jest.mock("@/store/personalExperience/selectors");
const mockPersonalExperienceByLocaleSelector = jest.mocked(
  personalExperienceByLocaleSelector
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
    return <div data-testid="experiences-form-item" />;
  }

  return MockFormItem;
});

describe("PersonalExperienceForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Experience",
        recentPositionsCount: 0,
        experiences: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalExperienceByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      recentPositionsCount: 0,
      experiences: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("experiences-id");

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
      recentPositionsCount: 0,
      experiences: [],
    };

    render(<PersonalExperienceForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalExperienceByLocaleSelector).toHaveBeenCalledWith(
      {},
      "en"
    );

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalExperience in edit mode", async () => {
    render(<PersonalExperienceForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-experience-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalExperience).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Experience",
          recentPositionsCount: 0,
          experiences: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalExperience in create mode", async () => {
    render(<PersonalExperienceForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-experience-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalExperience).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Experience",
          recentPositionsCount: 0,
          experiences: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalExperience when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        recentPositionsCount: 0,
        experiences: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalExperienceForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-experience-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalExperience).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Experience",
          recentPositionsCount: 0,
          experiences: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalExperience).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "experiences"', () => {
    render(<PersonalExperienceForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "experiences",
      })
    );
  });

  it("renders PersonalExperienceFormItem for each experience field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "experiences-1" }, { id: "experiences-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalExperienceForm resumeLocale="en" isEdit={false} />);

    expect(screen.getAllByTestId("experiences-form-item")).toHaveLength(2);
  });
});
