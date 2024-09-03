import { ChangeEvent, FormEvent, useState } from "react";
import "../UsedMarketPage.css";
import { Link } from "react-router-dom";
import searchImg from "@/assets/images/icons/ic_search.svg";
import { useSearchParams } from "react-router-dom";
import { ProductSearchType } from "@/types/ProductTypes";
import SortDropdown from "@/components/Layout/Dropdown/SortDropdown";
import {
  defaultOrderType,
  orderTypeKeysKR,
  orderTypeKR,
  orderTypeUS,
} from "@/constants/orderConstants";

const FAVORITE_ORDER = "favorite";

const ProductSearch: React.FC<ProductSearchType> = ({ onOptionChange }) => {
  const items = orderTypeKeysKR;
  const [searchParam, setSearchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const [keyword, setKeyword] = useState(initKeyword || "");

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleOrderChange = (option: string) => {
    onOptionChange(
      orderTypeUS[option as keyof typeof orderTypeUS] !== defaultOrderType
        ? FAVORITE_ORDER
        : orderTypeUS[option as keyof typeof orderTypeUS]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="all-products-bar">
      <h1>전체 상품</h1>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <div className="search-area">
            <img id="search-img" src={searchImg} alt="검색 돋보기" />
            <input
              id="search-input"
              type="text"
              name="keyword"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <Link to="/additem">
            <button id="add-item-button" className="blue-button button">
              상품 등록하기
            </button>
          </Link>
        </form>
        <SortDropdown
          onOrderChange={handleOrderChange}
          items={items}
          defaultOrderType={orderTypeKR[defaultOrderType]}
        />
      </div>
    </div>
  );
};

export default ProductSearch;
