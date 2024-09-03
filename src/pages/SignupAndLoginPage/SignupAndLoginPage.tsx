import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { pageConfig } from "@/components/Layout/Auth/AuthConfig";
import AuthForm from "@/components/Layout/Auth/AuthForm";
import EasyLogin from "@/components/Layout/Auth/EasyLogin";
import GoHomeLogo from "@/components/Layout/Auth/GoHomeLogo";
import { AuthFormProps } from "@/types/AuthTypes";
import styles from "@/components/Layout/Auth/Auth.module.scss";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryMode = location.pathname.replace(/^\/|\/$/g, "");

  const mode: AuthFormProps["mode"] =
    queryMode === "login" || queryMode === "signup" ? queryMode : "login";

  const { buttonText, infoMessage, goToPage } = pageConfig[mode];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles["signup-and-login-page-main"]}>
      <GoHomeLogo />
      <section className={styles["input"]}>
        <AuthForm mode={mode} />
      </section>
      <EasyLogin />
      <section className={styles["goto-page"]}>
        {infoMessage}
        <Link to={goToPage}>{buttonText}</Link>
      </section>
    </div>
  );
};

export default AuthPage;
