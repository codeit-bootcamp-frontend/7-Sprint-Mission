import React, { useEffect } from "react";
import InputField from "./InputField";
import { AuthFormProps } from "@/types/AuthTypes";
import { getFieldsByMode } from "./AuthConfig";
import styles from "./Auth.module.scss";
import Button from "../Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser, signIn, signUp } from "@/lib/authApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/apiDataStore";

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const setUserId = useUserStore((state) => state.setUserId);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: getFieldsByMode(mode).reduce(
      (acc, field) => ({ ...acc, [field.id]: "" }),
      {}
    ),
    criteriaMode: "all",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      if (mode === "signup") {
        await signUp(data);
        alert(
          "회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다."
        );
        navigate("/auth/login");
      } else if (mode === "login") {
        const result = await signIn(data);

        if (result.accessToken && result.refreshToken) {
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
        }

        try {
          const userInfo = await getUser();
          setUserId(userInfo.id);
        } catch (error) {
          console.error("유저 정보 얻기 오류 :", error);
        }

        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const { status, data } = error.response;
          let errorMessage = "알 수 없는 오류가 발생했습니다.";

          if (status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            errorMessage =
              "토큰이 만료되었거나 인증에 실패했습니다. 다시 로그인 해주세요.";
          }

          if (data.message) {
            errorMessage = data.message;
          } else if (data.details && typeof data.details === "object") {
            errorMessage = Object.values(data.details).join(", ");
          }

          alert(errorMessage);
        } else {
          alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
      } else {
        console.error("예상치 못한 오류 발생:", error);
        alert("예상치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    }
  };

  useEffect(() => {
    reset();
  }, [mode, reset]);

  return (
    <form
      method="post"
      id={mode}
      className={styles["form"]}
      onSubmit={handleSubmit(onSubmit)}
    >
      {getFieldsByMode(mode).map((field) => (
        <InputField
          key={field.id}
          field={field}
          control={control}
          error={(errors as Record<string, any>)[field.id]?.message}
        />
      ))}
      <Button className={styles["acc-button"]} disabled={!isValid}>
        {mode === "login" ? "로그인" : "회원가입"}
      </Button>
    </form>
  );
};

export default AuthForm;
