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
jest.mock("@/store/personalCourses/selectors");
const mockPersonalCoursesByLocaleSelector = jest.mocked(
  personalCoursesByLocaleSelector
);

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

jest.mock("@/views/shared/TextAreaField", () => {
  function MockTextAreaField() {
    return <textarea />;
  }

  return MockTextAreaField;
});

jest.mock("@/views/shared/DatePickerField", () => {
  function MockDatePickerField() {
    return <input />;
  }

  return MockDatePickerField;
});

jest.mock("@/views/shared/CheckboxField", () => {
  function MockCheckboxField() {
    return <input type="checkbox" />;
  }

  return MockCheckboxField;
});

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children }: any) => <div>{children}</div>,
}));

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
      .mockImplementationOnce((selector) => {
        return selector({} as any);
      })
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

  it("dispatches updatePersonalCourses in edit mode", async () => {
    const { container } = render(
      <PersonalCoursesForm resumeLocale="en" isEdit />
    );

    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        updatePersonalCourses({
          values: {
            sectionTitle: "Courses",
            courses: [],
          },
          locale: "en",
          resumeLocale: "en",
        })
      );
    });
  });

  it("dispatches createPersonalCourses in create mode", async () => {
    mockUseAppSelector
      .mockReturnValueOnce({
        sectionTitle: "",
        courses: [],
      })
      .mockReturnValueOnce(undefined);

    const { container } = render(
      <PersonalCoursesForm resumeLocale="en" isEdit={false} />
    );

    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        createPersonalCourses({
          values: {
            sectionTitle: "Courses",
            courses: [],
          },
          locale: "en",
          resumeLocale: "en",
        })
      );
    });
  });

  it("calls reset with default values", () => {
    render(<PersonalCoursesForm resumeLocale="en" isEdit={false} />);

    expect(mockedReset).toHaveBeenCalledWith({
      sectionTitle: "",
      courses: [],
    });
  });

  it("gets default values from personalCoursesByLocaleSelector", () => {
    mockUseAppSelector
      .mockReset()
      .mockImplementationOnce((callback) => {
        return callback({} as any);
      })
      .mockReturnValueOnce("courses-id");

    mockPersonalCoursesByLocaleSelector.mockReturnValue({
      sectionTitle: "",
      courses: [],
    });

    render(<PersonalCoursesForm resumeLocale="en" isEdit={false} />);

    expect(mockPersonalCoursesByLocaleSelector).toHaveBeenCalledTimes(1);
    expect(mockPersonalCoursesByLocaleSelector).toHaveBeenCalledWith({}, "en");
  });
});
