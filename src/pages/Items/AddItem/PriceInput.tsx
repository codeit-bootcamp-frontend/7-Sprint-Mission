import { ChangeEvent, useState } from "react";
import { IsValid } from "./AddItem";

interface Props {
  isValueCheck: (currentValue: string, name: keyof IsValid) => void;
  price?: number;
}

const PriceInput = ({ isValueCheck, price }: Props) => {
  const stringPrice = String(price);
  const [inputValue, setInputValue] = useState(
    stringPrice === "undefined" ? "0" : stringPrice
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    inputValue = inputValue.replace(/[^0-9]/g, "");

    setInputValue(inputValue);
  };

  const handleInputBlur = () => {
    isValueCheck(inputValue, "price");
  };

  return (
    <>
      <label htmlFor="item-price">판매가격</label>
      <input
        type="text"
        placeholder="판매 가격을 입력해주세요"
        value={Number(inputValue).toLocaleString()}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    </>
  );
};

export default PriceInput;
