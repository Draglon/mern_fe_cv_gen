type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

type DateValidationParams = {
  tShared: TFunction;
  getValues: any;
  startDatePath: string;
  isCurrentPath?: string;
};

export const getInputDatePickerRules = (tShared: TFunction) => ({
  required: {
    value: true,
    message: tShared("form.datePicker.errors.required"),
  },

  validate: {
    validDate: (value: string) => {
      if (!value) return true;

      return !isNaN(Date.parse(value))
        || tShared("form.datePicker.errors.invalid");
    },
  },
});

export const getInputEndDateRules = ({
  tShared,
  getValues,
  startDatePath,
  isCurrentPath,
}: DateValidationParams) => ({
  required: {
    value: !isCurrentPath,
    message: tShared("form.datePicker.errors.required"),
  },

  validate: {
    validDate: (value: string) => {
      const isCurrent = isCurrentPath
        ? getValues(isCurrentPath)
        : false;

      if (isCurrent) return true;

      if (!value) return true;

      return (
        !isNaN(Date.parse(value)) ||
        tShared("form.datePicker.errors.invalid")
      );
    },

    endDateAfterStart: (endDate: string) => {
      const isCurrent = isCurrentPath
        ? getValues(isCurrentPath)
        : false;

      if (isCurrent) return true;

      const startDate = getValues(startDatePath);

      if (!startDate || !endDate) {
        return true;
      }

      return (
        new Date(endDate) >= new Date(startDate) ||
        tShared("form.datePicker.errors.endDateAfterStart")
      );
    },
  },
});
