type ValidationFunction = (input: string) => boolean;

export interface AuthFormProps {
  mode: "login" | "signup";
}

export interface FieldInfo {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: string;
  className?: string;
  required?: boolean;
  emptyErrorMessage: string;
  invalidErrorMessage: string;
  isValid?: boolean;
  isEmpty?: boolean;
  value?: string | number | readonly string[] | undefined;
  validationFunction: ValidationFunction;
}

export interface PageConfigType {
  mode: "login" | "signup";
  buttonText: string;
  infoMessage: string;
  goToPage: string;
}

export interface SignUpData {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
}
