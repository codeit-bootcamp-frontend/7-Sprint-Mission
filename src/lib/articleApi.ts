import { defaultOrderType } from "@/constants/orderConstants";
import {
  ArticleApiData,
  ArticleCommentApiData,
  ArticlePostData,
} from "@/types/ArticleTypes";
import { getTokenFromLocalStorage, instance, setAuthHeader } from "./api";

export const getArticle = async ({
  articleId = "",
  page = 1,
  pageSize = 10,
  orderBy = defaultOrderType,
  keyword = "",
  detail = false,
}: ArticleApiData = {}) => {
  try {
    const params = detail ? undefined : { page, pageSize, orderBy, keyword };

    const response = await instance.get(`/articles/${articleId}`, {
      params,
    });

    if (response.status !== 200) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const getArticleComment = async ({
  articleId = "",
  limit = 10,
  cursor = 0,
}: ArticleCommentApiData) => {
  try {
    const response = await instance.get(`/articles/${articleId}/comments`, {
      params: { limit, cursor },
    });
    if (response.status !== 200) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const createPost = async (postData: ArticlePostData) => {
  try {
    const token = getTokenFromLocalStorage();

    if (token) {
      setAuthHeader(token);
    } else {
      console.warn("유효한 로그인이 아닙니다.");
    }

    const response = await instance.post<ArticlePostData>(
      "/articles",
      postData
    );
    return response.data;
  } catch (error) {
    console.error("게시글을 생성하는데 실패했습니다:", error);
    throw error;
  }
};
