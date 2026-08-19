import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, useFieldArray } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import createPersonalCourses from "@/store/personalCourses/operations/createPersonalCourses";
import updatePersonalCourses from "@/store/personalCourses/operations/updatePersonalCourses";
import { personalCoursesByLocaleSelector } from "@/store/personalCourses/selectors";

import PersonalCoursesForm from "..";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    typeof values?.index === "number" ? `${key}-${values.index}` : key,
}));

const mockedReset = jest.fn();
jest.mock("react-hook-form");

jest.mock("@/store/hooks");
jest.mock("@/store/personalCourses/operations/createPersonalCourses");
jest.mock("@/store/personalCourses/operations/updatePersonalCourses");
const mockCreatePersonalCourses = jest.mocked(createPersonalCourses);
const mockUpdatePersonalCourses = jest.mocked(updatePersonalCourses);
jest.mock("@/store/personalCourses/selectors");
const mockPersonalCoursesByLocaleSelector = jest.mocked(
  personalCoursesByLocaleSelector
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
    return <div data-testid="courses-form-item" />;
  }

  return MockFormItem;
});

describe("PersonalCoursesForm", () => {
  const dispatch = jest.fn();

  const mockUseAppDispatch = jest.mocked(useAppDispatch);
  const mockUseAppSelector = jest.mocked(useAppSelector);
  const mockUseForm = jest.mocked(useForm);
  const mockUseFieldArray = jest.mocked(useFieldArray);

  const handleSubmit = jest.fn(
    (callback) => () =>
      callback({
        sectionTitle: "Courses",
        courses: [],
      })
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(dispatch);

    mockPersonalCoursesByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      courses: [],
    });

    mockUseAppSelector
      .mockImplementationOnce((selector) => selector({} as any))
      .mockReturnValueOnce("courses-id");

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
      courses: [],
    };

    render(<PersonalCoursesForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalCoursesByLocaleSelector).toHaveBeenCalledWith({}, "en");

    expect(mockedReset).toHaveBeenCalledWith(defaultValues);
  });

  it("dispatches updatePersonalCourses in edit mode", async () => {
    render(<PersonalCoursesForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-courses-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockUpdatePersonalCourses).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Courses",
          courses: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalCourses in create mode", async () => {
    render(<PersonalCoursesForm resumeLocale="en" isEdit={false} />);

    const form = document.querySelector(
      'form[name="create-personal-courses-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalCourses).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Courses",
          courses: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });
  });

  it("dispatches createPersonalCourses when edit mode has no id", async () => {
    mockUseAppSelector
      .mockReset()
      .mockReturnValueOnce({
        sectionTitle: "",
        courses: [],
      })
      .mockReturnValueOnce(null);

    render(<PersonalCoursesForm resumeLocale="en" isEdit />);

    const form = document.querySelector(
      'form[name="create-personal-courses-en"]'
    );

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockCreatePersonalCourses).toHaveBeenCalledWith({
        values: {
          sectionTitle: "Courses",
          courses: [],
        },
        locale: "en",
        resumeLocale: "en",
      });
    });

    expect(mockUpdatePersonalCourses).not.toHaveBeenCalled();
  });

  it('initializes useFieldArray with "courses"', () => {
    render(<PersonalCoursesForm resumeLocale="en" isEdit={false} />);

    expect(mockUseFieldArray).toHaveBeenCalledWith(
      expect.objectContaining({
        control: expect.anything(),
        name: "courses",
      })
    );
  });

  it("renders PersonalCoursesFormItem for each courses field", () => {
    mockUseFieldArray.mockReturnValue({
      fields: [{ id: "courses-1" }, { id: "courses-2" }],
      append: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<PersonalCoursesForm resumeLocale="en" isEdit={false} />);

    expect(screen.getAllByTestId("courses-form-item")).toHaveLength(2);
  });
});
