import Comment from "./Comment";
import { CommentsSectionProp } from "@/types/ArticleTypes";
import styles from "./Comment.module.scss";
import LoadingSpinner from "../LoadingSpinner";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CommentsSection: React.FC<CommentsSectionProp> = ({
  comments: {
    comments,
    imgUrl: { src, alt },
    content,
  },
  className,
  isLoading,
}) => {
  const isCommentEmpty = !comments.length;
  const location = useLocation();

  const [urlId, setUrlId] = useState<number | null>(null);

  useEffect(() => {
    const match = location.pathname.match(/\/(\d+)$/);
    if (match) {
      setUrlId(Number(match[1]));
    } else {
      setUrlId(null);
    }
  }, [location.pathname]);

  return (
    <section className={`${styles["comments-section"]} ${className}`}>
      {isLoading ? (
        <div className={styles["loading"]}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {isCommentEmpty && (
            <div className={styles["empty-comment"]}>
              <img src={src} alt={alt} />
              <h3 style={{ whiteSpace: "pre-line" }}>{content}</h3>
            </div>
          )}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} urlId={urlId} />
          ))}
        </>
      )}
    </section>
  );
};

export default CommentsSection;
