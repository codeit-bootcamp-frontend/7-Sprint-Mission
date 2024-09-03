import backImg from "@/assets/images/icons/ic_back.svg";
import styles from "./Comment.module.scss";
import { Link } from "react-router-dom";

interface GoBackToListButtonProps {
  href?: string;
}

const GoBackToListButton: React.FC<GoBackToListButtonProps> = ({
  href = "",
}) => {
  return (
    <Link to={href}>
      <button className={styles["go-back-button"]}>
        목록으로 돌아가기
        <img src={backImg} alt="뒤로 돌아가는 화살표" />
      </button>
    </Link>
  );
};

export default GoBackToListButton;
