import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from "react";
import ItemTag from "@/pages/AddItemPage/ItemTag";
import { formatNumberWithComma } from "@/utils/Utils";
import FileInput from "@/pages/AddItemPage/FileInput";
import "@/pages/AddItemPage/AddItemPage.css";
import {
  useMutation,
  useQuery,
  UseMutationResult,
} from "@tanstack/react-query";

import { getProductDetails, updateProduct } from "@/lib/productApi";
import { uploadImage } from "@/lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { ProductPostData } from "@/types/ProductTypes";

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemIntroduction, setFormData] = useState({
    itemTitle: { value: "", isValid: false },
    itemPrice: { value: "", rawValue: 0, isValid: false },
    itemTag: { value: [] as string[], isValid: false },
    itemDescription: { value: "", isValid: false },
  });

  const [fileValue, setFileValue] = useState<File | null>(null);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);

  const isFormValid = Object.values(itemIntroduction).every(
    (input) => input.isValid
  );

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails({ productId: Number(id) }),
  });

  useEffect(() => {
    if (product) {
      setFormData({
        itemTitle: { value: product.name, isValid: true },
        itemPrice: {
          value: formatNumberWithComma(product.price.toString()),
          rawValue: product.price,
          isValid: true,
        },
        itemTag: { value: product.tags, isValid: product.tags.length > 0 },
        itemDescription: { value: product.description, isValid: true },
      });
      setInitialImageUrl(product.images[0] || null);
    }
  }, [product]);

  const updateTagAndValidity = (newTagArray: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      itemTag: { value: newTagArray, isValid: newTagArray.length > 0 },
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    const trimmedValue = value.trim();

    setFormData((prevData) => ({
      ...prevData,
      [id]: { value, isValid: trimmedValue !== "" },
    }));
  };

  const handleTagChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputElement = e.target as HTMLInputElement;
      const newValue = inputElement.value.trim();
      if (newValue) {
        const newTags: string[] = newValue
          .split(" ")
          .filter(
            (tag: string) => !itemIntroduction.itemTag.value.includes(tag)
          );
        if (newTags.length > 0) {
          const newTagArray = [...itemIntroduction.itemTag.value, ...newTags];
          updateTagAndValidity(newTagArray);
        }
      }
      inputElement.value = "";
    }
  };

  const handleTagCancel = (tagValue: string) => {
    const newTagArray = itemIntroduction.itemTag.value.filter(
      (value) => value !== tagValue
    );
    updateTagAndValidity(newTagArray);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPrice = e.target.value;
    const rawPrice = parseFloat(inputPrice.replace(/,/g, ""));
    const formattedPrice = formatNumberWithComma(rawPrice.toString());

    setFormData((prevData) => ({
      ...prevData,
      itemPrice: {
        value: formattedPrice,
        rawValue: rawPrice,
        isValid: !isNaN(rawPrice),
      },
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFileValue(() => file);
  };

  const uploadPostMutation: UseMutationResult<
    ProductPostData,
    Error,
    ProductPostData
  > = useMutation({
    mutationFn: (updatedPost: ProductPostData) =>
      updateProduct({
        productUrl: `/products/${id}`,
        productData: updatedPost,
      }),
    onSuccess: () => {
      navigate("/items");
    },
    onError: (error) => {
      console.error("게시물 업데이트 중 오류가 발생 : ", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileValue && !initialImageUrl) {
      console.warn("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      const imageUrl = fileValue
        ? await uploadImage(fileValue)
        : initialImageUrl;

      const updatedPost: ProductPostData = {
        images: [imageUrl || ""],
        tags: itemIntroduction.itemTag.value,
        price: itemIntroduction.itemPrice.rawValue,
        description: itemIntroduction.itemDescription.value,
        name: itemIntroduction.itemTitle.value,
      };

      uploadPostMutation.mutate(updatedPost);
    } catch (error) {
      console.error("게시물 업데이트 중 오류가 발생 : ", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="add-item-page">
      <form onSubmit={handleSubmit}>
        <div className="add-item-bar">
          <h1>상품 수정하기</h1>
          <button className="button" disabled={!isFormValid}>
            수정
          </button>
        </div>
        <h2 id="item-img-h2">상품 이미지</h2>
        <FileInput
          name="imgFile"
          value={fileValue}
          onChange={handleFileChange}
        />
        <h2>상품명</h2>
        <input
          id="itemTitle"
          value={itemIntroduction.itemTitle.value}
          placeholder="상품명을 입력해주세요"
          onChange={handleChange}
        />
        <h2>상품 소개</h2>
        <textarea
          id="itemDescription"
          value={itemIntroduction.itemDescription.value}
          placeholder="상품소개를 입력해주세요"
          onChange={handleChange}
        />
        <h2>판매가격</h2>
        <input
          id="itemPrice"
          value={itemIntroduction.itemPrice.value}
          placeholder="판매가격을 입력해주세요"
          onChange={handlePriceChange}
        />
        <h2>태그</h2>
        <input
          id="itemTag"
          placeholder="태그를 입력해주세요"
          onKeyDown={handleTagChange}
        />
        <div className="tag-wrapper">
          {itemIntroduction.itemTag.value.map((value, index) => (
            <ItemTag key={index} value={value} onCancel={handleTagCancel} />
          ))}
        </div>
      </form>
    </section>
  );
};

export default EditItemPage;
