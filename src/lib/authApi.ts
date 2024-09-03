import { SignUpData } from "@/types/AuthTypes";
import axios from "axios";
import { getTokenFromLocalStorage, setAuthHeader } from "./api";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

export const signUp = async (data: SignUpData) => {
  try {
    const response = await instance.post("/auth/signUp", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "가입 중 오류 발생:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("가입 중 알 수 없는 오류 발생:", error);
    }
    throw error;
  }
};

export const signIn = async ({ email, password }: SignUpData) => {
  try {
    const response = await instance.post("/auth/signIn", {
      email,
      password,
    });

    const { user, accessToken, refreshToken } = response.data;

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error("로그인 오류:", error);
    throw error;
  }
};

export const getUser = async () => {
  const token = getTokenFromLocalStorage();

  if (!token) return;

  try {
    const response = await instance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("유저 정보 얻기 오류:", error);
    throw error;
  }
};
