type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputDatePickerRules = (tShared:TFunction) => ({
  required: tShared("form.datePiker.errors.required"),
});
