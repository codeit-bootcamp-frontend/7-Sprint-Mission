import React from "react";
import bestProductThumbnail from "@/assets/images/home/bestseller-product-thumbnail.png";
import searchDesiredProducts from "@/assets/images/home/search-desired-products.png";
import registerProductsSale from "@/assets/images/home/register-products-for-sale.png";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <section id="hero" className="banner">
        <div className="wrapper">
          <h1 className="wrapper-font">
            일상의 모든 물건을
            <br className="visibility-br" />
            거래해 보세요
          </h1>
          <Link to="/items" className="button pill-button">
            구경하러 가기
          </Link>
        </div>
      </section>
      <section id="features" className="wrapper">
        <div className="feature">
          <img src={bestProductThumbnail} alt="인기 상품" width="50%" />
          <div className="feature-content">
            <h2 className="feature-tag">Hot item</h2>
            <h1 className="">
              인기 상품을 <br className="visibility-br" />
              확인해 보세요
            </h1>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-content">
            <h2 className="feature-tag">Search</h2>
            <h1>
              구매를 원하는 <br className="visibility-br" />
              상품을 검색하세요
            </h1>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img src={searchDesiredProducts} alt="검색 기능" width="50%" />
        </div>
        <div className="feature">
          <img src={registerProductsSale} alt="판매 상품 등록" width="50%" />
          <div className="feature-content">
            <h2 className="feature-tag">Register</h2>
            <h1>
              판매를 원하는 <br className="visibility-br" />
              상품을 등록하세요
            </h1>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
      <section id="bottomBanner" className="banner">
        <div className="wrapper">
          <h1 className="wrapper-font">
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </>
  );
};

export default HomePage;
