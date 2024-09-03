import { ChangeEvent, useState } from "react";
import { IsValid } from "./AddItem";

interface Props {
  isValueCheck: (currentValue: string, name: keyof IsValid) => void;
  name?: string;
}

const TitleInput = ({ isValueCheck, name = "" }: Props) => {
  const [inputValue, setInputValue] = useState(name);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    isValueCheck(inputValue, "name");
  };

  return (
    <>
      <label htmlFor="item-name">상품명</label>
      <input
        type="text"
        id="item-name"
        name="item-name"
        placeholder="상품명을 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    </>
  );
};

export default TitleInput;
