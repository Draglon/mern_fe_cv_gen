type SubmitLoadingProps = {
  isSubmitting: boolean;
}

const isSubmitLoading = ({ isSubmitting }: SubmitLoadingProps): boolean => isSubmitting;

export default isSubmitLoading;
