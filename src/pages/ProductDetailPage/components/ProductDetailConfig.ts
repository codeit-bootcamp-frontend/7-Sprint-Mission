import { CommentObject } from "@/types/ArticleTypes";
import { FieldInfo } from "@/types/RegisterTypes";
import emptyImg from "@/assets/images/icons/Img_inquiry_empty.svg";

export const commentInfo: CommentObject = {
  comments: [],
  content: "아직 문의가 없어요.",
  imgUrl: {
    src: emptyImg,
    alt: "빈 코멘트",
  },
};

export enum PRODUCT_FIELDTYPE {
  TITLE = "문의하기",
}

export const fields: Record<PRODUCT_FIELDTYPE, FieldInfo> = {
  [PRODUCT_FIELDTYPE.TITLE]: {
    id: PRODUCT_FIELDTYPE.TITLE,
    name: PRODUCT_FIELDTYPE.TITLE,
    type: "input",
    placeholder:
      "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.",
  },
};
