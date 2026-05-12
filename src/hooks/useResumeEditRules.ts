import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { getSectionTitleRules } from "@/utils/forms/validations/resume/sectionTitleValidation";
import { getInputTextNameRules } from "@/utils/forms/validations/resume/inputTextNameValidation";
import { getInputTextRules } from "@/utils/forms/validations/resume/inputTextValidation";
import { getInputNumberRules } from "@/utils/forms/validations/resume/inputNumberValidation";
import { getTextareaRules } from "@/utils/forms/validations/resume/textareaValidation";
import { getSelectRules, getSelectLanguageRules } from "@/utils/forms/validations/resume/selectValidation";
import { getInputDatePickerRules } from "@/utils/forms/validations/resume/inputDatePickerValidation";
import { getInputLinkRules } from "@/utils/forms/validations/resume/inputLinkValidation";
import { getEmailRules } from "@/utils/forms/validations/emailValidation";

const useResumeEditRules = () => {
  const tShared = useTranslations("shared");

  const rules = useMemo(() => ({
    sectionTitleRules: getSectionTitleRules(tShared),
    inputTextNameRules: getInputTextNameRules(tShared),
    inputTextRules: getInputTextRules(tShared),
    inputNumberRules: getInputNumberRules(tShared),
    textareaRules: getTextareaRules(tShared),
    selectRules: getSelectRules(tShared),
    selectLanguageRules: getSelectLanguageRules(tShared),
    emailRules: getEmailRules(tShared),
    inputLinkRules: getInputLinkRules(tShared),
    datePickerRules: getInputDatePickerRules(tShared),
  }), [tShared]);

  return rules;
}

export default useResumeEditRules;
