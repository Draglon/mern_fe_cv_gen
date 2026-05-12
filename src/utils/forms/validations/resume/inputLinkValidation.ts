type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputLinkRules = (tShared: TFunction) => ({
  validate: (value?: string) => {
    if (!value) return true;

    try {
      new URL(value);
      return true;
    } catch {
      return tShared("form.inputLink.errors.invalid");
    }
  },
});
