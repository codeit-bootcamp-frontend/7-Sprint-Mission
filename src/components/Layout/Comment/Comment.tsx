import React, { useState } from "react";
import { getFormatTime, getElapsedTime } from "@/utils/Utils";
import { CommentType } from "@/types/ArticleTypes";
import styles from "./Comment.module.scss";
import defaultProfileImg from "@/assets/images/icons/ic_user.svg";
import MenuDropdown from "../Dropdown/MenuDropdown";
import { useConfirm } from "../ConfirmPopup";
import { MENU_OPTION } from "@/types/UiTypes";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import { useUserStore } from "@/store/apiDataStore";
import useAddAndEditProduct from "@/hooks/useAddAndEditProduct";
import { CommentPostData } from "@/types/ProductTypes";

const Comment: React.FC<{ comment: CommentType; urlId: number | null }> = ({
  comment: {
    id,
    content,
    writer: { image, nickname, id: writerId },
    createdAt,
  },
  urlId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const elapsedTime = getElapsedTime(createdAt);
  const formattedTime = getFormatTime(createdAt);
  const profileImg = image ? image : defaultProfileImg;

  const { confirm, ConfirmPopupComponent } = useConfirm();
  const { userId } = useUserStore();

  const isCurrentUser = userId === writerId;

  const { mutate: deleteComment } = useDeleteProduct({
    onSuccessRedirectUrl: "",
    productUrl: "comments",
    queryKey: "comments",
  });

  const editProduct = useAddAndEditProduct({
    onSuccessRedirectUrl: "",
    productUrl: location.pathname.startsWith("/items")
      ? `/products/${urlId}/comments`
      : `/articles/${urlId}/comments`,
    queryKey: "comments",
  });

  const handleOrderChange = async (option: string) => {
    if (option === MENU_OPTION.EDIT) {
      setIsEditing(true);
    } else if (option === MENU_OPTION.DELETE) {
      const result = await confirm(
        "정말로 이 항목을 삭제하시겠습니까?",
        "삭제",
        "취소"
      );
      if (result) {
        deleteComment(id);
      }
    }
  };

  const handleSave = () => {
    if (location.pathname.startsWith("/items")) {
      const productData: CommentPostData = {
        content: editedContent,
      };

      editProduct.mutate({
        productData: productData,
        file: null,
      });
    } else {
      const articleData: CommentPostData = {
        content: editedContent,
      };
      editProduct.mutate({ productData: articleData, file: null });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles["comment-content-Wrapper"]}>
        {isEditing ? (
          <div className={styles["edit-wrapper"]}>
            <textarea
              className={styles["edit-input"]}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className={styles["edit-btn-wrapper"]}>
              <button className={styles["edit-btn"]} onClick={handleSave}>
                저장
              </button>
              <button className={styles["edit-btn"]} onClick={handleCancel}>
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{content}</p>
            {isCurrentUser && (
              <div className={styles["kebab-image"]}>
                <MenuDropdown
                  onOrderChange={handleOrderChange}
                  items={[MENU_OPTION.EDIT, MENU_OPTION.DELETE]}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles["writer-wrapper"]}>
        <img src={profileImg} alt={`${nickname}의 프로필 사진`} />
        <div className={styles["nickname-wrapper"]}>
          <h3>{nickname}</h3>
          <h4>
            {formattedTime} {`(${elapsedTime})`}
          </h4>
        </div>
      </div>
      <div className={styles["horizontal-divider"]}></div>
      {ConfirmPopupComponent}
    </div>
  );
};

export default Comment;
