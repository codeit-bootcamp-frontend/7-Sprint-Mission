import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import kebab_ic from "../../../assets/ic_kebab.svg";
import heartIcon from "../../../assets/ic_heart_detail.svg";
import { DetailItem } from "./ProductDetail";
import { deleteProduct } from "../api";

interface Props {
  detailItem: DetailItem;
  productId?: string;
}

const ProductDetailInfo = ({ detailItem, productId }: Props) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelectClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProduct(id),
  });

  const handleDropdownClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const id = Number(productId);

    if (target.id === "edit") {
      navigate(`/edititem/${productId}`);
    } else if (target.id === "delete") {
      deleteMutate({ id });
      navigate("/items");
    }

    setDropdownVisible(false);
  };
  return (
    <section className="product-info-section">
      <img
        src={detailItem.images[0]}
        alt="상품이미지"
        className="product-img"
      />
      <div className="product-info-wrap">
        <div className="product-name-wrap">
          <h2 className="product-name">{detailItem.name}</h2>
          {Number(userId) === detailItem.ownerId && (
            <button
              type="button"
              className="product-more-btn"
              onClick={handleSelectClick}
            >
              <img src={kebab_ic} alt="수정삭제버튼" />
            </button>
          )}
          {dropdownVisible && (
            <ul className="order-dropdown">
              <li
                className="order-option"
                id="edit"
                onClick={handleDropdownClick}
              >
                수정하기
              </li>
              <li
                className="order-option delete"
                id="delete"
                onClick={handleDropdownClick}
              >
                삭제하기
              </li>
            </ul>
          )}
        </div>
        <div className="product-price">{detailItem.price.toLocaleString()}</div>
        <h3 className="product-description-title">상품 소개</h3>
        <p className="product-description">{detailItem.description}</p>
        <h3 className="product-tag-title">상품 태그</h3>
        <div className="product-tag-wrap">
          {detailItem.tags.map((item, index) => (
            <div key={index} className="product-tag">{`#${item}`}</div>
          ))}
        </div>
        <button className="product-favorite">
          <img src={heartIcon} alt="좋아요아이콘" />
          <span>{detailItem.favoriteCount}</span>
        </button>
      </div>
    </section>
  );
};

export default ProductDetailInfo;
