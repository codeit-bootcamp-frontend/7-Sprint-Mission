import { getArticle, getArticleComment } from "@/lib/articleApi";
import styles from "./BoardDetailArticle.module.scss";
import CommentsSection from "@/components/Layout/Comment/CommentsSection";
import RegisterForm from "@/components/Layout/RegisterForm/RegisterForm";
import GoBackToListButton from "@/components/Layout/Comment/GoBackToListButton";
import { CommentObject } from "@/types/ArticleTypes";
import { commentInfo, fields } from "./BoardDetailConfig";
import BoardDetailArticle from "./BoardDetailArticle";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const FreeBoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const formFields = fields;

  const {
    data: article,
    isLoading: isArticleLoading,
    isError: isArticleError,
    error: articleError,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle({ articleId: id, detail: true }),
    enabled: !!id,
  });

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getArticleComment({ articleId: id }),
    enabled: !!id,
    select: (result) => ({
      ...commentInfo,
      comments: result.list,
    }),
  });

  if (isArticleLoading || isCommentsLoading) return <></>;
  if (isArticleError || isCommentsError) return <></>;

  return (
    <div className={styles["freeboard-detail-main"]}>
      <BoardDetailArticle article={article} />
      <RegisterForm fields={formFields} bottomButton={true} />
      <CommentsSection
        comments={commentsData as CommentObject}
        className={styles["comment"]}
        isLoading={isCommentsLoading}
      />
      <GoBackToListButton href="/boards" />
    </div>
  );
};

export default FreeBoardDetail;
