import { useState, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../api";

interface Props {
  productId?: string;
  commentKey: string;
}

const ProductDetailInquiry = ({ productId, commentKey }: Props) => {
  const queryClient = useQueryClient();

  const [inquiryValue, setInquiryValue] = useState("");

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInquiryValue(e.target.value);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, value }: { id: number; value: string }) =>
      postComment(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentKey, productId] });
    },
  });

  const handleSubmitClick = async () => {
    const id = Number(productId);

    try {
      mutate({ id, value: inquiryValue });
      setInquiryValue("");
    } catch (error) {
      console.error("문의 글 등록에 실패했습니다", error);
    }
  };

  return (
    <section className="product-inquiry-section">
      <label htmlFor="inquiry">문의하기</label>
      <textarea
        name="inquiry"
        id="inquiry"
        value={inquiryValue}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        onChange={handleTextareaChange}
      />
      <div className="inquiry-btn-wrap">
        <button
          type="button"
          disabled={isPending || !inquiryValue}
          onClick={handleSubmitClick}
        >
          등록
        </button>
      </div>
    </section>
  );
};

export default ProductDetailInquiry;
