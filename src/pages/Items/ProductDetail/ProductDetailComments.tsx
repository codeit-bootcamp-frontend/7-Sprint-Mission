import { useState, MouseEvent, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import inquiryImg from "../../../assets/Img_inquiry_empty.svg";
import kebab_ic from "../../../assets/ic_kebab.svg";
import { Comment } from "./ProductDetail";
import { editComment, deleteComment } from "../api";

interface Props {
  comments: Comment[];
  productId?: string;
  commentKey: string;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);
  const secondsAgo = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const units = [
    { name: "년", seconds: 31536000 },
    { name: "개월", seconds: 2592000 },
    { name: "일", seconds: 86400 },
    { name: "시간", seconds: 3600 },
    { name: "분", seconds: 60 },
    { name: "초", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.name} 전`;
    }
  }

  return "방금 전";
}

const ProductDetailComments = ({ comments, productId, commentKey }: Props) => {
  const userId = localStorage.getItem("userId");
  const queryClient = useQueryClient();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [isEditVisible, setIsEditVisible] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleSelectClick = (commentId: number) => {
    setDropdownVisible((prevId) => (prevId === commentId ? null : commentId));
  };

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: ({ id, value }: { id: number; value: string }) =>
      editComment(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentKey, productId] });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentKey, productId] });
    },
  });

  const handleDropdownClick = (
    e: MouseEvent<HTMLLIElement>,
    commentId: number
  ) => {
    const target = e.currentTarget;

    if (target.id === "edit") {
      setIsEditVisible(commentId);
    } else if (target.id === "delete") {
      deleteMutate({ id: commentId });
    }

    setDropdownVisible(null);
  };

  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEditVisible(null);
    setEditValue("");
  };

  const handleEditSubmit = (commentId: number) => {
    editMutate({ id: commentId, value: editValue });
    setIsEditVisible(null);
    setEditValue("");
  };

  return (
    <section className="product-comment-section">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="product-comment-wrap" key={comment.id}>
            {isEditVisible !== comment.id && (
              <div className="product-comment-top">
                <p className="product-comment">{comment.content}</p>
                {Number(userId) === comment.writer.id && (
                  <button
                    type="button"
                    className="product-comment-btn"
                    onClick={() => handleSelectClick(comment.id)}
                  >
                    <img src={kebab_ic} alt="수정삭제버튼" />
                  </button>
                )}
                {dropdownVisible === comment.id && (
                  <ul className="order-dropdown">
                    <li
                      className="order-option"
                      id="edit"
                      onClick={(e) => handleDropdownClick(e, comment.id)}
                    >
                      수정하기
                    </li>
                    <li
                      className="order-option delete"
                      id="delete"
                      onClick={(e) => handleDropdownClick(e, comment.id)}
                    >
                      삭제하기
                    </li>
                  </ul>
                )}
              </div>
            )}

            {isEditVisible === comment.id && (
              <div className="product-comment-top-edit">
                <label htmlFor="comment-edit">문의하기 수정</label>
                <textarea
                  name="comment-edit"
                  id="comment-edit"
                  placeholder="수정할 내용을 입력해주세요."
                  value={editValue}
                  onChange={handleEditChange}
                />
              </div>
            )}

            <div className="product-comment-bottom">
              <div
                className={
                  isEditVisible
                    ? "product-profile-edit-wrap"
                    : "product-profile-wrap"
                }
              >
                <img
                  src={comment.writer.image}
                  alt="프로필이미지"
                  className="product-profile-img"
                />
                <div>
                  <div className="product-profile-name">
                    {comment.writer.nickname}
                  </div>
                  <span className="product-profile-time">
                    {timeAgo(comment.updatedAt)}
                  </span>
                </div>
              </div>
              {isEditVisible === comment.id && (
                <div className="product-comment-edit">
                  <button
                    type="button"
                    className="comment-cancel"
                    onClick={handleCancelClick}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="comment-edit"
                    disabled={editIsPending || !editValue}
                    onClick={() => handleEditSubmit(comment.id)}
                  >
                    수정 완료
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="product-inquiry-img-wrap">
          <img src={inquiryImg} alt="문의이미지" />
          <div>아직 문의가 없습니다.</div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailComments;
