import { useQuery } from "@tanstack/react-query";
import BestProductItem from "./BestProductItem";
import useDeviceType from "@/hooks/useDeviceType";
import { Link } from "react-router-dom";
import { Item } from "@/types/ProductTypes";
import { getProducts } from "@/lib/productApi";

const ITEM_INIT = 4;
const TABLET_ITEM_NUM = 2;
const MOBILE_ITEM_NUM = 1;

const BestProductList = () => {
  const { isMobile, isTablet } = useDeviceType();
  const itemsPerPage = isMobile
    ? MOBILE_ITEM_NUM
    : isTablet
    ? TABLET_ITEM_NUM
    : ITEM_INIT;

  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", itemsPerPage],
    queryFn: () =>
      getProducts({
        orderBy: "favorite",
        pageSize: itemsPerPage,
      }),
    select: (data) => data.list,
  });

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <section className="best-products">
      <h1>베스트 상품</h1>
      <ul className="list-area">
        {items.map((item: Item) => (
          <Link key={item.id} to={`/items/${item.id}`}>
            <BestProductItem item={item} />
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default BestProductList;
