import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllProductItem from "./AllProductItem";
import Pagination from "./Pagination";
import { getProductItem } from "./api";
import searchIcon from "../../assets/search_icon.svg";
import { Product } from "../../types/product";

interface Props {
  pageSize: number;
  title: string;
  TopContainer: string;
}

const AllProductList = ({ pageSize, title, TopContainer }: Props) => {
  const token = localStorage.getItem("accessToken");
  // api 상태 관리
  const [product, setProduct] = useState<Product[]>([
    {
      createdAt: "",
      description: "",
      favoriteCount: 0,
      id: 0,
      images: [],
      name: "",
      ownerId: 0,
      price: 0,
      tags: [],
      updatedAt: "",
    },
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [order, setOrder] = useState<string>("recent");
  // orderSelect 상태 관리
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  // pagination 상태 관리
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleOrderSelectClick = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleDropdownClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;

    target.id === "recent" ? setOrder("recent") : setOrder("favorite");

    setIsDropdownVisible(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getAllProduct = async () => {
      const data = await getProductItem(currentPage, pageSize, order);
      setProduct(data.list);
      setTotalCount(data.totalCount);
    };
    getAllProduct();
  }, [order, currentPage, pageSize]);

  return (
    <section className="all-product">
      {TopContainer === "pc_tablet" && (
        <div className="top-container">
          <h2>{title}</h2>
          <div>
            <div className="search-wrap">
              <img src={searchIcon} alt="검색아이콘" />
              <input
                className="search-input"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
            <Link to="/additem">
              <button
                className="product-registration-btn"
                type="button"
                disabled={!token}
              >
                상품 등록하기
              </button>
            </Link>
            <div className="order-wrap">
              <button
                type="button"
                className="order-select"
                onClick={handleOrderSelectClick}
              >
                {order === "recent" ? "최신순" : "좋아요순"}
              </button>
              {isDropdownVisible && (
                <ul className="order-dropdown">
                  <li
                    className="order-option"
                    id="recent"
                    onClick={handleDropdownClick}
                  >
                    최신순
                  </li>
                  <li
                    className="order-option"
                    id="favorite"
                    onClick={handleDropdownClick}
                  >
                    좋아요순
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      {TopContainer === "mobile" && (
        <div className="top-container-m">
          <div className="top-wrap">
            <h2>{title}</h2>
            <Link to="/additem">
              <button className="product-registration-btn" type="button">
                상품 등록하기
              </button>
            </Link>
          </div>
          <div className="bottom-wrap">
            <div className="search-wrap">
              <img src={searchIcon} alt="검색아이콘" />
              <input
                className="search-input"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
            <div className="order-wrap">
              <button
                type="button"
                title="정렬버튼"
                className="order-select"
                onClick={handleOrderSelectClick}
              ></button>
              {isDropdownVisible && (
                <ul className="order-dropdown">
                  <li
                    className="order-option"
                    id="recent"
                    onClick={handleDropdownClick}
                  >
                    최신순
                  </li>
                  <li
                    className="order-option"
                    id="favorite"
                    onClick={handleDropdownClick}
                  >
                    좋아요순
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      <ul className="item-list">
        {product.map(({ id, images, name, price, favoriteCount }) => (
          <li key={id}>
            <Link to={`./${id}`} className="item-link">
              <AllProductItem
                imgUrl={images[0]}
                name={name}
                price={price}
                favoriteCount={favoriteCount}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default AllProductList;
