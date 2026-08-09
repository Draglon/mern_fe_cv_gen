import { renderHook } from "@testing-library/react";

import useResumeEditRules from "../useResumeEditRules";

import { useTranslations } from "next-intl";

import { getSectionTitleRules } from "@/utils/forms/validations/resume/sectionTitleValidation";
import { getInputTextNameRules } from "@/utils/forms/validations/resume/inputTextNameValidation";
import { getInputTextRules } from "@/utils/forms/validations/resume/inputTextValidation";
import { getInputPostalAddressRules } from "@/utils/forms/validations/resume/inputPostalAddressValidation";
import { getInputNumberLevelRules, getInputNumberRecentPositionsCountRules } from "@/utils/forms/validations/resume/inputNumberValidation";
import { getTextareaRules } from "@/utils/forms/validations/resume/textareaValidation";
import { getSelectRules, getSelectLanguageRules } from "@/utils/forms/validations/resume/selectValidation";
import { getInputDatePickerRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";
import { getInputTelegramRules } from "@/utils/forms/validations/resume/inputTelegramValidation";
import { getInputLinkRules } from "@/utils/forms/validations/resume/inputLinkValidation";
import { getInputPhoneNumberRules } from "@/utils/forms/validations/resume/inputPhoneNumberValidation";
import { getEmailRules } from "@/utils/forms/validations/emailValidation";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/utils/forms/validations/resume/sectionTitleValidation", () => ({
  getSectionTitleRules: jest.fn(() => "sectionTitleRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputTextNameValidation", () => ({
  getInputTextNameRules: jest.fn(() => "inputTextNameRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputTextValidation", () => ({
  getInputTextRules: jest.fn(() => "inputTextRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputPostalAddressValidation", () => ({
  getInputPostalAddressRules: jest.fn(() => "inputPostalAddressRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputNumberValidation", () => ({
  getInputNumberLevelRules: jest.fn(() => "inputNumberLevelRules"),
  getInputNumberRecentPositionsCountRules: jest.fn(() => "inputNumberRecentPositionsCountRules"),
}));

jest.mock("@/utils/forms/validations/resume/textareaValidation", () => ({
  getTextareaRules: jest.fn(() => "textareaRules"),
}));

jest.mock("@/utils/forms/validations/resume/selectValidation", () => ({
  getSelectRules: jest.fn(() => "selectRules"),
  getSelectLanguageRules: jest.fn(() => "selectLanguageRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputDatePickerValidation", () => ({
  getInputDatePickerRules: jest.fn(() => "inputDatePickerRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputTelegramValidation", () => ({
  getInputTelegramRules: jest.fn(() => "inputTelegramRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputLinkValidation", () => ({
  getInputLinkRules: jest.fn(() => "inputLinkRules"),
}));

jest.mock("@/utils/forms/validations/resume/inputPhoneNumberValidation", () => ({
  getInputPhoneNumberRules: jest.fn(() => "inputPhoneNumberRules"),
}));

jest.mock("@/utils/forms/validations/emailValidation", () => ({
  getEmailRules: jest.fn(() => "emailRules"),
}));

describe("useResumeEditRules", () => {
  const tShared = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(tShared);
  });

  it("returns validation rules", () => {
    const { result } = renderHook(() => useResumeEditRules());

    expect(useTranslations).toHaveBeenCalledWith("shared");

    expect(result.current).toEqual({
      sectionTitleRules: "sectionTitleRules",
      inputTextNameRules: "inputTextNameRules",
      inputTextRules: "inputTextRules",
      inputPostalAddressRules: "inputPostalAddressRules",
      inputNumberLevelRules: "inputNumberLevelRules",
      inputNumberRecentPositionsCountRules: "inputNumberRecentPositionsCountRules",
      textareaRules: "textareaRules",
      selectRules: "selectRules",
      selectLanguageRules: "selectLanguageRules",
      emailRules: "emailRules",
      inputTelegramRules: "inputTelegramRules",
      inputLinkRules: "inputLinkRules",
      inputPhoneNumberRules: "inputPhoneNumberRules",
      datePickerRules: "inputDatePickerRules",
    });
  });

  it("passes translations to validation factories", () => {
    renderHook(() => useResumeEditRules());

    expect(getSectionTitleRules).toHaveBeenCalledWith(tShared);
    expect(getInputTextNameRules).toHaveBeenCalledWith(tShared);
    expect(getInputTextRules).toHaveBeenCalledWith(tShared);
    expect(getInputPostalAddressRules).toHaveBeenCalledWith(tShared);
    expect(getInputNumberLevelRules).toHaveBeenCalledWith(tShared);
    expect(getInputNumberRecentPositionsCountRules).toHaveBeenCalledWith(tShared);
    expect(getTextareaRules).toHaveBeenCalledWith(tShared);
    expect(getSelectRules).toHaveBeenCalledWith(tShared);
    expect(getSelectLanguageRules).toHaveBeenCalledWith(tShared);
    expect(getInputDatePickerRules).toHaveBeenCalledWith(tShared);
    expect(getInputTelegramRules).toHaveBeenCalledWith(tShared);
    expect(getInputLinkRules).toHaveBeenCalledWith(tShared);
    expect(getInputPhoneNumberRules).toHaveBeenCalledWith(tShared);
    expect(getEmailRules).toHaveBeenCalledWith(tShared);
  });
});
