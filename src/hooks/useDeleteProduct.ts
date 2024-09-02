import { useNavigate } from "react-router-dom";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteProduct } from "@/lib/productApi";

interface UseDeleteProductOptions {
  onSuccessRedirectUrl: string;
  productUrl: string;
  queryKey?: string;
}

const useDeleteProduct = ({
  onSuccessRedirectUrl: onSuccessRedirectUrl,
  productUrl,
  queryKey,
}: UseDeleteProductOptions) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation: UseMutationResult<void, Error, number> = useMutation({
    mutationFn: (productId: number) =>
      deleteProduct({
        productUrl,
        productId,
      }),
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      } else {
        queryClient.invalidateQueries();
      }
      alert("삭제되었습니다.");
      navigate(onSuccessRedirectUrl);
    },
    onError: (error) => {
      console.error("삭제 중 오류가 발생했습니다:", error);
    },
  });

  return mutation;
};

export default useDeleteProduct;
