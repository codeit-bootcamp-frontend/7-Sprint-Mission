import logoImg from "@/assets/images/icons/panda-market-logo.svg";
import styles from "./Auth.module.scss";
import { Link } from "react-router-dom";

const GoHomeLogo = () => {
  return (
    <section className={styles["go-home-logo"]}>
      <Link to="/">
        <img src={logoImg} alt="판다 마켓 홈" width="396" />
      </Link>
    </section>
  );
};

export default GoHomeLogo;
