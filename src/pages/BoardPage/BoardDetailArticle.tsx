import { Article } from "@/types/ArticleTypes";
import styles from "./BoardDetailArticle.module.scss";
import defalutProfleImg from "@/assets/images/icons/ic_user.svg";
import favoriteImg from "@/assets/images/icons/ic_heart.svg";
import { getFormatTime } from "@/utils/Utils";
import MenuDropdown from "@/components/Layout/Dropdown/MenuDropdown";
import { MENU_OPTION } from "@/types/UiTypes";
import { useConfirm } from "@/components/Layout/ConfirmPopup";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import { useUserStore } from "@/store/apiDataStore";

interface BoardDetailArticleProps {
  article: Article;
}

const BoardDetailArticle: React.FC<BoardDetailArticleProps> = ({
  article: {
    id,
    title,
    content,
    writer: { nickname, id: writerId },
    likeCount,
    createdAt,
  },
}) => {
  const { confirm, ConfirmPopupComponent } = useConfirm();
  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccessRedirectUrl: "/boards",
    productUrl: "articles",
  });

  const { userId } = useUserStore();

  const isCurrentUser = userId === writerId;

  const handleOrderChange = async (option: string) => {
    if (option === MENU_OPTION.EDIT) {
    } else if (option === MENU_OPTION.DELETE) {
      const result = await confirm(
        "정말로 이 항목을 삭제하시겠습니까?",
        "삭제",
        "취소"
      );
      if (result) {
        deleteProduct(id);
      }
    }
  };

  return (
    <section className={styles["board-detail-article-section"]}>
      <div className={styles["title-wrapper"]}>
        <h1>{title}</h1>
        {isCurrentUser && (
          <div className="kebabImage">
            <MenuDropdown
              onOrderChange={handleOrderChange}
              items={[MENU_OPTION.EDIT, MENU_OPTION.DELETE]}
            />
          </div>
        )}
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles["user-wrapper"]}>
          <img src={defalutProfleImg} alt="기본 유저 프로필" />
          <h3>{nickname}</h3>
          <span>{getFormatTime(createdAt, false)}</span>
        </div>
        <span className={styles["vertical-divider"]}></span>
        <div className={styles["favorite-wrapper"]}>
          <img src={favoriteImg} alt="즐겨찾기" />
          <span>{likeCount}</span>
        </div>
      </div>
      <span className={styles["horizontal-divider"]}></span>
      <span className={styles.content}>{content}</span>
      {ConfirmPopupComponent}
    </section>
  );
};

export default BoardDetailArticle;
