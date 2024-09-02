import searchImg from "@/assets/images/icons/ic_search.svg";
import styles from "./SearchInput.module.scss";
import { KeyboardEvent } from "react";

interface SearchInputProps {
  onSortBySearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSortBySearch }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSortBySearch(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="검색할 상품을 입력해주세요"
        onKeyDown={handleKeyDown}
      />
      <img className={styles.search} src={searchImg} alt="검색 돋보기" />
    </div>
  );
};

export default SearchInput;
