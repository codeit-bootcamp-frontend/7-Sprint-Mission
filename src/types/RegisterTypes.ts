export interface FieldInfo {
  id: string;
  name: string;
  type: "input" | "textarea" | "file";
  placeholder?: string;
}

export type FormValues = Record<string, string | File | null>;

export interface RegisterFormProps {
  fields: { [key: string]: FieldInfo };
  titleText?: string;
  buttonText?: string;
  bottomButton?: boolean;
  href?: string;
}

export interface InputFieldProps {
  field: FieldInfo;
  value?: string | File | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | File | null
  ) => void;
}

export type HandleChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | File
  | null;

export type HandleChange = (e: HandleChangeEvent) => void;
