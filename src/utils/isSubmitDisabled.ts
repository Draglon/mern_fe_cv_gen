type SubmitDisabledProps = {
  isSubmitting: boolean;
  isDirty: boolean;
}

const isSubmitDisabled = ({ isSubmitting, isDirty }: SubmitDisabledProps): boolean => isSubmitting || !isDirty;

export default isSubmitDisabled;
