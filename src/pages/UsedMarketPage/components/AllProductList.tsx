import { useState, useEffect } from "react";
import AllProductItem from "./AllProductItem";
import ProductSearch from "./ProductSearch";
import Pagination from "./Pagination";
import { getCustomRound } from "@/utils/Utils";
import useDeviceType from "@/hooks/useDeviceType";
import { Link } from "react-router-dom";
import { getProducts } from "@/lib/productApi";
import { useQuery } from "@tanstack/react-query";
import { Item } from "@/types/ProductTypes";

const PAGE_INIT = 1;
const ITEM_INIT = 10;
const TABLET_ITEM_NUM = 6;
const MOBILE_ITEM_NUM = 4;

const AllProductList = () => {
  const { isMobile, isTablet } = useDeviceType();
  const itemsPerPage = isMobile
    ? MOBILE_ITEM_NUM
    : isTablet
    ? TABLET_ITEM_NUM
    : ITEM_INIT;

  const [orderBy, setOrderBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(PAGE_INIT);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products", orderBy, currentPage, itemsPerPage],
    queryFn: () =>
      getProducts({
        orderBy,
        pageSize: itemsPerPage,
        page: currentPage,
      }),
    select: (data) => ({
      items: data.list,
      totalCount: data.totalCount,
    }),
  });

  const pageNumber = getCustomRound(data?.totalCount / itemsPerPage || 0);

  useEffect(() => {
    refetch();
  }, [orderBy, currentPage, itemsPerPage, refetch]);

  const handleOptionChange = (option: string) => {
    setOrderBy(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <section className="all-products">
      <ProductSearch onOptionChange={handleOptionChange} />
      <ul className="list-area all-area">
        {data?.items.map((item: Item) => (
          <Link key={item.id} to={`/items/${item.id}`}>
            <AllProductItem item={item} />
          </Link>
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          onPageChange={handlePageChange}
          pageNumber={pageNumber}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default AllProductList;
