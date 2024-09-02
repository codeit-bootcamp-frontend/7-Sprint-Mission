import { useConfirm } from "@/components/Layout/ConfirmPopup";
import ProductTags from "./ProductTags";
import favoriteImg from "@/assets/images/icons/ic_heart.svg";
import MenuDropdown from "@/components/Layout/Dropdown/MenuDropdown";
import { ProductDetailType } from "@/types/ProductTypes";
import { MENU_OPTION } from "@/types/UiTypes";
import { useNavigate } from "react-router-dom";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import { useUserStore } from "@/store/apiDataStore";

const ProductInformation = ({
  productDetails: {
    id,
    tags,
    name,
    price,
    description,
    favoriteCount,
    ownerId,
  },
}: {
  productDetails: ProductDetailType;
}) => {
  const productPrice = price.toLocaleString();
  const { confirm, ConfirmPopupComponent } = useConfirm();
  const navigate = useNavigate();

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccessRedirectUrl: "/items",
    productUrl: "products",
  });

  const { userId } = useUserStore();

  const isCurrentUser = userId === ownerId;

  const handleOrderChange = async (option: string) => {
    if (option === MENU_OPTION.EDIT) {
      navigate(`/edititem/${id}`);
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
    <div className="productInfo">
      <div className="detailsWrapper">
        <div className="titleWrapper">
          <h1>{name}</h1>
          {isCurrentUser && (
            <div className="kebabImage">
              <MenuDropdown
                onOrderChange={handleOrderChange}
                items={[MENU_OPTION.EDIT, MENU_OPTION.DELETE]}
              />
            </div>
          )}
        </div>
        <h2>{productPrice}원</h2>
        <div className="dividerLine"></div>
        <h3>상품 소개</h3>
        <p>{description}</p>
        <h3>상품 태그</h3>
        <div className="productTagsWrapper">
          {tags.map((tag, index) => (
            <ProductTags key={index} tag={tag} />
          ))}
        </div>
      </div>
      <button className="favoriteButton">
        <img src={favoriteImg} alt="좋아요 수" />
        <h3>{favoriteCount}</h3>
      </button>
      {ConfirmPopupComponent}
    </div>
  );
};

export default ProductInformation;
