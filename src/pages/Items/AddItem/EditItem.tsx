import { useState, useEffect, MouseEvent, KeyboardEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddItem.css";
import ImageInput from "./ImageInput";
import TagInput from "./TagInput";
import PriceInput from "./PriceInput";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import { editItem, postUploadImage, getProductDetailItem } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostProduct } from "../../../types/product";

export interface IsValid {
  name: boolean;
  description: boolean;
  price: boolean;
  tags: boolean;
}

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [disabled, setDisabled] = useState(false);
  const [isValid, setIsValid] = useState<IsValid>({
    name: true,
    description: true,
    price: true,
    tags: true,
  });

  const { data: detailItem } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductDetailItem(id),
  });

  const [inputValues, setInputValues] = useState<PostProduct>({
    images: detailItem.images[0],
    name: detailItem.name,
    description: detailItem.description,
    price: detailItem.price,
    tags: detailItem.tags,
  });

  const isValueCheck = (
    currentValue: string | string[],
    name: keyof IsValid
  ) => {
    if (currentValue.length > 0) {
      setIsValid((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
      setInputValues((prev) => ({
        ...prev,
        [name]: currentValue,
      }));
    } else if (currentValue.length < 1) {
      setIsValid((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
      setInputValues((prev) => ({
        ...prev,
        [name]: currentValue,
      }));
    }
  };

  const imgFileUpload = async (imgFile: FormData) => {
    const result = await postUploadImage(imgFile);
    if (result) {
      setInputValues((prev) => ({
        ...prev,
        images: result.url,
      }));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      newInputValues,
      productId,
    }: {
      newInputValues: PostProduct;
      productId: number;
    }) => editItem(newInputValues, productId),
    onSuccess: ({ id }) => {
      navigate(`/items/${id}`);
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productId = Number(id);

    const newInputValues = {
      ...inputValues,
      price: Number(inputValues.price),
    };

    mutate({ newInputValues, productId });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const allTrue = Object.values(isValid).every((value) => value === true);

    setDisabled(allTrue);
  }, [isValid]);

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="form-submit">
        <h2>상품 등록하기</h2>
        <button type="submit" disabled={isPending || !disabled}>
          등록
        </button>
      </div>
      <ImageInput imgFileUpload={imgFileUpload} image={detailItem.images[0]} />
      <TitleInput isValueCheck={isValueCheck} name={detailItem.name} />
      <DescriptionInput
        isValueCheck={isValueCheck}
        description={detailItem.description}
      />
      <PriceInput isValueCheck={isValueCheck} price={detailItem.price} />
      <TagInput isValueCheck={isValueCheck} tags={detailItem.tags} />
    </form>
  );
};

export default EditItem;
