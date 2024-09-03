import { PostProduct } from "../../types/product";

interface RequestOptions {
  method: string;
  headers?: HeadersInit;
  body?: string | FormData;
}

const fetchRequest = async (url: string, options: RequestOptions) => {
  try {
    const response = await fetch(url, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
        window.location.href = "/login";
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("HTTP 요청에 실패했습니다:", error);
    throw error;
  }
};

export const getProductItem = (
  currentPage = 1,
  pageSize: number,
  order: string
) => {
  const url = `https://panda-market-api.vercel.app/products?page=${encodeURIComponent(
    currentPage
  )}&pageSize=${encodeURIComponent(pageSize)}&orderBy=${encodeURIComponent(
    order
  )}`;
  return fetchRequest(url, { method: "GET" });
};

export const getProductDetailItem = (id: string | undefined) => {
  if (!id) {
    console.error("Error: Product ID is undefined");
    return;
  }
  const url = `https://panda-market-api.vercel.app/products/${encodeURIComponent(
    id
  )}`;
  return fetchRequest(url, { method: "GET" });
};

export const getProductDetailComments = (id: string | undefined) => {
  if (!id) {
    console.error("Error: Product ID is undefined");
    return;
  }
  const url = `https://panda-market-api.vercel.app/products/${encodeURIComponent(
    id
  )}/comments?limit=3`;
  return fetchRequest(url, { method: "GET" });
};

export const postAddItem = (data: PostProduct) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/products`;
  return fetchRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const postUploadImage = (imgFile: FormData) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/images/upload`;
  return fetchRequest(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: imgFile,
  });
};

export const editItem = (data: PostProduct, id: number) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/products/${id}`;
  return fetchRequest(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteProduct = (id: number) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/products/${id}`;
  return fetchRequest(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postComment = (id: number, content: string) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/products/${id}/comments`;
  return fetchRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
};

export const editComment = (id: number, content: string) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/comments/${id}`;
  return fetchRequest(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
};

export const deleteComment = (id: number) => {
  const token = localStorage.getItem("accessToken");
  const url = `https://panda-market-api.vercel.app/comments/${id}`;
  return fetchRequest(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
