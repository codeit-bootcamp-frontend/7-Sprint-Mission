import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductPostData, UnifiedPostData } from "@/types/ProductTypes";
import { uploadImage } from "@/lib/api";
import { createProduct, updateProduct } from "@/lib/productApi";
import { useNavigate } from "react-router-dom";
import { ArticlePostData } from "@/types/ArticleTypes";

interface UseAddProductOptions {
  onSuccessRedirectUrl: string;
  productUrl: string;
  queryKey?: string;
  isPatch?: boolean;
  productPatchData?: any;
}

function isProductData(data: UnifiedPostData): data is ProductPostData {
  return (data as ProductPostData).images !== undefined;
}

function isArticlePostData(data: UnifiedPostData): data is ArticlePostData {
  return (data as ArticlePostData).image !== undefined;
}

const useAddAndEditProduct = ({
  onSuccessRedirectUrl,
  productUrl,
  queryKey,
  isPatch = false,
  productPatchData,
}: UseAddProductOptions) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      productData,
      file,
    }: {
      productData: UnifiedPostData;
      file: File | null;
    }) => {
      if (file) {
        const imageUrl = await uploadImage(file);

        if (productData && isProductData(productData)) {
          productData.images = [imageUrl];
        } else if (productData && isArticlePostData(productData)) {
          productData.image = imageUrl;
        }
      }

      if (isPatch) {
        return updateProduct({ productUrl, productData: productPatchData });
      } else {
        return createProduct({
          productData,
          productUrl,
        });
      }
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      } else {
        queryClient.invalidateQueries();
      }
      navigate(onSuccessRedirectUrl);
      alert("항목이 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("항목 등록 중 오류 발생:", error);
      alert("항목 등록 중 오류가 발생했습니다.");
    },
  });
};

export default useAddAndEditProduct;
