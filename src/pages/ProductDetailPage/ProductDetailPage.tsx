import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "./components/ProductDetails";
import CommentsSection from "@/components/Layout/Comment/CommentsSection";
import GoBackToListButton from "@/components/Layout/Comment/GoBackToListButton";
import "./ProductDetailPage.scss";
import { ProductDetailType } from "@/types/ProductTypes";
import { CommentObject } from "@/types/ArticleTypes";
import { commentInfo, fields } from "./components/ProductDetailConfig";
import RegisterForm from "@/components/Layout/RegisterForm/RegisterForm";
import { getProductDetails } from "@/lib/productApi";
import { useQuery } from "@tanstack/react-query";

const ProductDetailPage = () => {
  const { productId } = useParams<string>();
  const formFields = fields;

  const {
    data: productDetail,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductDetails({ productId: Number(productId) }),
    enabled: !!productId,
  });

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () =>
      getProductDetails({
        productId: Number(productId),
        comments: true,
      }),
    select: (result) => ({
      ...commentInfo,
      comments: result.list ?? [],
    }),
    enabled: !!productId,
  });

  if (isProductLoading || isCommentsLoading) return <p>Loading...</p>;
  if (isProductError || isCommentsError) {
    return <p>Error: {productError?.message || commentsError?.message}</p>;
  }

  const comments: CommentObject = commentsData || commentInfo;

  return (
    <section className="productDetailsMain">
      <ProductDetails productDetails={productDetail || {}} />
      <RegisterForm fields={formFields} bottomButton={true} />
      <CommentsSection comments={comments} isLoading={isCommentsLoading} />
      <GoBackToListButton href="/items" />
    </section>
  );
};

export default ProductDetailPage;
