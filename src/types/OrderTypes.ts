import { ORDER_TYPE_ENUM } from "@/constants/orderConstants";

export type Order = keyof typeof ORDER_TYPE_ENUM;
