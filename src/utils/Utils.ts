import { CSSProperties } from "react";

// 숫자만 입력 및 숫자 쉼표로 구분하여 반환
export function formatNumberWithComma(number: string) {
  return number.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 아이템 수에 따라 페이지 수 구할 때 나머지 있다면 올림
export function getCustomRound(number: number) {
  const decimalPart = number % 1;
  if (decimalPart >= 0.1) {
    return Math.ceil(number);
  } else {
    return Math.floor(number);
  }
}

// 페이지 수 배열로 얻기
export function getPageNumberArray(number: number, index = 1) {
  const numbers = [];
  for (let i = index; i <= number; i++) {
    numbers.push(i);
  }
  return [...numbers];
}

// 링크 스타일(기본은 color)
export function getLinkStyle({
  isActive = false,
  linkColorProp = "color",
  linkColor = "var(--activate-button-blue)",
}) {
  return {
    [linkColorProp]: isActive ? linkColor : "",
  };
}

export const getActiveLinkStyle = (paths: string[]): CSSProperties => {
  const location = window.location.pathname;
  const isActive = paths.some((path) => location.startsWith(path));
  return getLinkStyle({ isActive });
};

// 여러 페이지 일 때 지정 페이지면 해당 배열 구하기
export const getPageRange = (
  currentPage: number,
  totalPageSize: number,
  maximumRange: number
) => {
  let startPage = 1;

  if (maximumRange <= currentPage) {
    startPage = Math.floor((currentPage - 1) / maximumRange) * maximumRange + 1;
  }

  let remainPage = totalPageSize - startPage + 1;
  const pages = Array.from(
    { length: Math.min(maximumRange, remainPage) },
    (item, index) => index + startPage
  );

  return pages;
};

// 업데이트 된 시간을 기준으로 경과 시간 구함
export function getElapsedTime(updatedAtString: string) {
  const updatedAt = new Date(updatedAtString);
  const currentTime = new Date();

  const timeDiff = currentTime.getTime() - updatedAt.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) {
    return "방금 전";
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 30) {
    return `${days}일 전`;
  } else if (months < 12) {
    return `${months}개월 전`;
  } else {
    return `${years}년 전`;
  }
}

// 2024.4.23 10:7 PM 형식으로 포맷
export function getFormatTime(updatedAtString: string, isHour: boolean = true) {
  const updatedAt = new Date(updatedAtString);

  let formattedDateTime = `${updatedAt.getFullYear()}. ${
    updatedAt.getMonth() + 1
  }. ${updatedAt.getDate()}`;

  if (isHour) {
    const formattedHour =
      updatedAt.getHours() > 12
        ? updatedAt.getHours() - 12
        : updatedAt.getHours();
    const amPm = updatedAt.getHours() >= 12 ? "PM" : "AM";

    formattedDateTime += ` ${formattedHour}:${updatedAt.getMinutes()} ${amPm}`;
  }

  return formattedDateTime.trim();
}

export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export const calculatePageRange = (
  currentPage: number,
  pageNumber: number,
  rangeSize: number
) => {
  let startPage = Math.max(
    1,
    Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1
  );
  let endPage = startPage + rangeSize - 1;

  if (endPage > pageNumber) {
    endPage = pageNumber;
  }

  if (endPage < pageNumber && endPage - startPage + 1 < rangeSize) {
    startPage = Math.max(1, endPage - rangeSize + 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};
