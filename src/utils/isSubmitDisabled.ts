type SubmitDisabledProps = {
  isValid: boolean;
  isDirty: boolean;
}

const isSubmitDisabled = ({ isValid, isDirty }: SubmitDisabledProps, isLoading: boolean): boolean => !isDirty || !isValid || isLoading;

export default isSubmitDisabled;
