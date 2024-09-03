const API_BASE_URL = "https://panda-market-api.vercel.app";

interface RequestOptions {
  method: string;
  headers: HeadersInit;
  body: string;
}

const fetchRequest = async (url: string, options: RequestOptions) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "요청에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  const options: RequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  };
  return fetchRequest(`${API_BASE_URL}/auth/signUp`, options);
};

export const login = async (email: string, password: string) => {
  const options: RequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  const data = await fetchRequest(`${API_BASE_URL}/auth/signIn`, options);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("userId", data.user.id);
  return data;
};
