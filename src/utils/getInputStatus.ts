import isPresent from "@/utils/isPresent";

type InputStatusProps = {
  status?: "error" | "warning" | "success" | "validating";
  errors?: {
    type: string;
    message: string;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ errors, status }: InputStatusProps) => isPresent(errors) ? "error" : status;
