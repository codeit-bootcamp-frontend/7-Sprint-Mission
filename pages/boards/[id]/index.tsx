import Image from "next/image";
import kebabIcon from "@/assets/icons/ic_kebab.svg";
import profileImage from "@/assets/icons/ic_profile.svg";
import likeIcon from "@/assets/icons/ic_heart.svg";
import CommentItem from "./components/CommentItem";
import backIcon from "@/assets/icons/ic_back.svg";
import NoComment from "./components/NoComment";
import styles from "@/pages/boards/[id]/styles.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getArticleById,
  getArticleComments,
  Article,
  Comment,
} from "@/services/articles";

function BoardsDetail() {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const router: any = useRouter();
  const { id } = router.query;
  const articleId = Array.isArray(id) ? id[0] : id;

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const handleBackListButtonClick = () => {
    router.push("/boards");
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          getArticleById(articleId),
          getArticleComments(articleId, 10),
        ]);

        setArticle(articleResponse.data);
        setComments(commentsResponse.data.list);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다..!", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>게시글이 없습니다.!</div>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["title-container"]}>
          <p className={styles["title"]}>{article.title}</p>
          <Image src={kebabIcon} alt="케밥 아이콘" width={24} height={24} />
        </div>

        <div className={styles["user-container"]}>
          <div className={styles["user-wrapper"]}>
            <Image
              className={styles["user-profile-image"]}
              src={profileImage}
              alt="프로필"
              width={24}
              height={24}
            />
            <span className={styles["user-name"]}>
              {article.writer.nickname}
            </span>
            <span className={styles["date"]}>
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={styles["like-wrapper"]}>
            <Image src={likeIcon} alt="좋아요" width={24} height={24} />
            <span className={styles["like-count"]}>{article.likeCount}</span>
          </div>
        </div>
      </div>
      <p className={styles["description"]}>{article.content}</p>

      <div className={styles["comment-container"]}>
        <label className={styles["comment"]} htmlFor="comment">
          댓글 달기
        </label>
        <textarea
          id="comment"
          value={textAreaValue}
          onChange={handleTextAreaChange}
          className={styles["comment-textarea"]}
          placeholder="댓글을 입력해주세요."
        />
        <div className={styles["comment-button-container"]}>
          <div></div>
          <button
            className={styles["comment-button"]}
            disabled={!textAreaValue}
          >
            등록
          </button>
        </div>
      </div>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      {comments.length === 0 && <NoComment />}

      <div className={styles["back-button-container"]}>
        <button
          className={styles["back-button"]}
          onClick={handleBackListButtonClick}
        >
          목록으로 돌아가기
          <Image src={backIcon} alt="뒤로가기" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

export default BoardsDetail;
