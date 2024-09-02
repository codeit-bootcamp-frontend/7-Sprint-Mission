import { FocusEvent } from "react";
import { FieldInfo, PageConfigType } from "@/types/AuthTypes";

export enum FIELDTYPE {
  EMAIL = "email",
  NICKNAME = "nickname",
  PASSWORD = "password",
  PASSWORDCONFIRMATION = "passwordConfirmation",
}

export const fields: { [id: string]: FieldInfo } = {
  [FIELDTYPE.EMAIL]: {
    id: FIELDTYPE.EMAIL,
    name: FIELDTYPE.EMAIL,
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
    autoComplete: FIELDTYPE.EMAIL,
    type: FIELDTYPE.EMAIL,
    required: true,
    emptyErrorMessage: "이메일을 입력해주세요.",
    invalidErrorMessage: "잘못된 이메일 형식입니다.",
    value: "",
    validationFunction: checkEmail,
  },
  [FIELDTYPE.NICKNAME]: {
    id: FIELDTYPE.NICKNAME,
    name: FIELDTYPE.NICKNAME,
    label: "닉네임",
    placeholder: "닉네임을 입력해주세요",
    autoComplete: FIELDTYPE.NICKNAME,
    type: "text",
    emptyErrorMessage: "닉네임을 입력해주세요.",
    invalidErrorMessage: "닉네임을 입력해주세요.",
    value: "",
    validationFunction: checkNotEmpty,
  },
  [FIELDTYPE.PASSWORD]: {
    id: FIELDTYPE.PASSWORD,
    name: FIELDTYPE.PASSWORD,
    label: "비밀번호",
    placeholder: "비밀번호를 입력해주세요",
    autoComplete: "new-password",
    type: FIELDTYPE.PASSWORD,
    required: true,
    emptyErrorMessage: "비밀번호를 입력해주세요.",
    invalidErrorMessage: "비밀번호를 8자 이상 입력해주세요.",
    value: "",
    validationFunction: checkPasswordLength,
  },
  [FIELDTYPE.PASSWORDCONFIRMATION]: {
    id: FIELDTYPE.PASSWORDCONFIRMATION,
    name: FIELDTYPE.PASSWORDCONFIRMATION,
    label: "비밀번호 확인",
    placeholder: "비밀번호를 다시 입력해주세요",
    autoComplete: "new-password",
    type: "password",
    required: true,
    emptyErrorMessage: "비밀번호 확인을 입력해주세요.",
    invalidErrorMessage: "비밀번호가 일치하지 않습니다.",
    value: "",
    validationFunction: checkPasswordMatch,
  },
};

export function checkNotEmpty(value: string): boolean {
  return value.trim() !== "";
}

export function checkEmail(input: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
}

export function checkPasswordLength(
  input: string | FocusEvent<HTMLInputElement>
): boolean {
  if (typeof input === "string") {
    return input.length >= 8;
  }
  return false;
}

export function checkPasswordMatch() {
  const inputPassword = document.querySelector("#password") as HTMLInputElement;
  const inputPasswordConfirmation = document.querySelector(
    "#passwordConfirmation"
  ) as HTMLInputElement;

  return inputPassword?.value === inputPasswordConfirmation?.value;
}

export function getErrorMessage(
  isEmpty: boolean,
  isValid: boolean,
  emptyErrorMessage: string,
  invalidErrorMessage: string
) {
  return isEmpty ? emptyErrorMessage : isValid ? "" : invalidErrorMessage;
}

export const getFieldsByMode = (mode: "login" | "signup") => {
  const baseFields = [fields[FIELDTYPE.EMAIL], fields[FIELDTYPE.PASSWORD]];

  const additionalFieldsByMode: {
    [key in "signup" | "login"]?: FieldInfo[];
  } = {
    signup: [
      fields[FIELDTYPE.EMAIL],
      fields[FIELDTYPE.NICKNAME],
      fields[FIELDTYPE.PASSWORD],
      fields[FIELDTYPE.PASSWORDCONFIRMATION],
    ],
  };

  return additionalFieldsByMode[mode] || baseFields;
};

export const pageConfig: { [key: string]: PageConfigType } = {
  login: {
    mode: "login",
    buttonText: "회원가입",
    infoMessage: "판다마켓이 처음이신가요? ",
    goToPage: "/signup",
  },
  signup: {
    mode: "signup",
    buttonText: "로그인",
    infoMessage: "이미 회원이신가요? ",
    goToPage: "/login",
  },
};
