import React, { useState, useEffect } from "react";
import arrowLeftImg from "@/assets/images/icons/arrow_left.svg";
import arrowRightImg from "@/assets/images/icons/arrow_right.svg";
import { PaginationType } from "@/types/ProductTypes";
import { calculatePageRange } from "@/utils/Utils";

const Pagination: React.FC<PaginationType> = ({
  onPageChange,
  pageNumber,
  currentPage,
  rangeSize = 5,
}) => {
  const [pageRange, setPageRange] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(currentPage);
  const [isArrowDisabled, setIsArrowDisabled] = useState([false, false]);

  useEffect(() => {
    setPageRange(calculatePageRange(currentPage, pageNumber, rangeSize));
    setActivePage(currentPage);
    setIsArrowDisabled([currentPage <= 1, currentPage >= pageNumber]);
  }, [currentPage, pageNumber, rangeSize]);

  const handleLodePage = (num: number) => {
    setActivePage(num);
    onPageChange(num);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageNumber || newPage === currentPage) return;

    setActivePage(newPage);
    onPageChange(newPage);
  };

  return (
    <>
      <button
        id="arrowLeft"
        className={`circle ${isArrowDisabled[0] ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <img
          className={`arrow-image ${isArrowDisabled[0] ? "disabled" : ""}`}
          src={arrowLeftImg}
          alt="왼쪽 화살표"
        />
      </button>
      <div className="page-nums">
        {pageRange.map((num) => (
          <button
            className={`circle ${num === activePage ? "active" : ""}`}
            key={num}
            onClick={() => handleLodePage(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        id="arrowRight"
        className={`circle ${isArrowDisabled[1] ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <img
          className={`arrow-image ${isArrowDisabled[1] ? "disabled" : ""}`}
          src={arrowRightImg}
          alt="오른쪽 화살표"
        />
      </button>
    </>
  );
};

export default Pagination;
