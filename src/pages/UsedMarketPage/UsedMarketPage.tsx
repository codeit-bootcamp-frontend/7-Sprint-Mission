import BestProductList from "./components/BestProductList";
import AllProductList from "./components/AllProductList";
import "./UsedMarketPage.css";

const UsedMarketPage = () => {
  return (
    <div className="usedMarketPage-main">
      <BestProductList />
      <AllProductList />
    </div>
  );
};

export default UsedMarketPage;
