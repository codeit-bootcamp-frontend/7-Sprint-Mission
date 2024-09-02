import { FieldInfo } from "@/types/RegisterTypes";

export enum FIELDTYPE {
  TITLE = "*제목",
  CONTENT = "*내용",
  IMAGE = "이미지",
}

export const fields: Record<FIELDTYPE, FieldInfo> = {
  [FIELDTYPE.TITLE]: {
    id: FIELDTYPE.TITLE,
    name: FIELDTYPE.TITLE,
    type: "input",
    placeholder: "제목을 입력해주세요",
  },
  [FIELDTYPE.CONTENT]: {
    id: FIELDTYPE.CONTENT,
    name: FIELDTYPE.CONTENT,
    type: "textarea",
    placeholder: "내용을 입력해주세요",
  },
  [FIELDTYPE.IMAGE]: {
    id: FIELDTYPE.IMAGE,
    name: FIELDTYPE.IMAGE,
    type: "file",
  },
};
