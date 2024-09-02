import { ReactNode } from "react";

export interface ButtonProps {
  href?: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface FileInputType {
  name: string;
  value: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}
