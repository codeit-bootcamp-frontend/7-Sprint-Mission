import { ORDER_TYPE_ENUM } from "@/constants/orderConstants";

export interface Article {
  content: string;
  createdAt: string;
  id: number;
  image: string | null;
  likeCount: number;
  title: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ArticleApiData {
  articleId?: string | string[];
  page?: number;
  pageSize?: number;
  orderBy?: ORDER_TYPE_ENUM.RECENT | ORDER_TYPE_ENUM.LIKE;
  keyword?: string | string[] | undefined | null;
  detail?: boolean;
}

export interface ArticleProps {
  initialArticles: Article[];
}

export interface ArticleProp {
  article: Article;
}

// Comment
export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    image: string;
    nickname: string;
  };
};

export interface ArticleCommentApiData {
  articleId?: string | string[];
  limit?: number;
  cursor?: number;
}

export interface CommentObject {
  comments: CommentType[];
  content: string;
  imgUrl: { src: string; alt: string };
}

export interface CommentsSectionProp {
  comments: CommentObject;
  className?: string;
  isLoading?: boolean;
}

export interface ArticlePostData {
  image: File | null;
  content: string;
  title: string;
}
