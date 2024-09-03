export enum ORDER_TYPE_ENUM {
  RECENT = "recent",
  LIKE = "like",
}

export const orderTypeKR = {
  [ORDER_TYPE_ENUM.RECENT]: "최신순",
  [ORDER_TYPE_ENUM.LIKE]: "추천순",
} as const;

export const orderTypeUS = {
  [orderTypeKR[ORDER_TYPE_ENUM.RECENT]]: ORDER_TYPE_ENUM.RECENT,
  [orderTypeKR[ORDER_TYPE_ENUM.LIKE]]: ORDER_TYPE_ENUM.LIKE,
} as const;

export const orderTypeKeys = Object.values(ORDER_TYPE_ENUM);
export const orderTypeKeysKR = Object.values(orderTypeKR);
export const defaultOrderType = ORDER_TYPE_ENUM.RECENT;

export type OrderTypeKR = (typeof orderTypeKR)[keyof typeof orderTypeKR];
