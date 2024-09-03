import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./ProductDetail.css";
import { getProductDetailItem, getProductDetailComments } from "../api";
import backIcon from "../../../assets/ic_back.svg";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailInquiry from "./ProductDetailInquiry";
import ProductDetailComments from "./ProductDetailComments";

export interface DetailItem {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface Comment {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  writer: {
    id: number;
    image: string;
    nickname: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const productCommentsKey = "productComments";

  const {
    data: detailItem,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductDetailItem(id),
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: [productCommentsKey, id],
    queryFn: () => getProductDetailComments(id),
  });

  if (isDetailLoading || isCommentsLoading) {
    return <div className="product-container">로딩 중...</div>;
  }

  if (detailError || commentsError) {
    return <div className="product-container">에러가 발생했습니다.</div>;
  }

  return (
    <div className="product-container">
      <ProductDetailInfo detailItem={detailItem} productId={id} />
      <ProductDetailInquiry productId={id} commentKey={productCommentsKey} />
      <ProductDetailComments
        comments={comments.list}
        productId={id}
        commentKey={productCommentsKey}
      />
      <Link
        to="/items"
        className={`product-back-link ${
          comments.list.length ? "" : "margin-top"
        }`}
      >
        <button type="button" className="product-back-btn">
          <span>목록으로 돌아가기</span>
          <img src={backIcon} alt="뒤로가기아이콘" />
        </button>
      </Link>
    </div>
  );
};

export default ProductDetail;
