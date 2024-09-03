import { ChangeEvent, useState } from "react";
import { IsValid } from "./AddItem";

interface Props {
  isValueCheck: (currentValue: string, name: keyof IsValid) => void;
  description?: string;
}

const DescriptionInput = ({ isValueCheck, description = "" }: Props) => {
  const [inputValue, setInputValue] = useState(description);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    isValueCheck(inputValue, "description");
  };
  return (
    <>
      <label htmlFor="item-description">상품 소개</label>
      <textarea
        id="item-description"
        name="item-description"
        placeholder="상품 소개를 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    </>
  );
};

export default DescriptionInput;
