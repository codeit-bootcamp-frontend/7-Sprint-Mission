import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import { ButtonProps } from "@/types/CommonTypes";

const Button: React.FC<ButtonProps> = ({
  href = "",
  children,
  disabled = false,
  className = "",
}) => {
  if (!href) {
    return (
      <button className={`${styles.button} ${className}`} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <Link to={href}>
      <button className={styles.button} disabled={disabled}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
