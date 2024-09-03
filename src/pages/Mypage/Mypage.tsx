import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="mypage-container">
      <button type="button" onClick={handleLogoutClick}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
