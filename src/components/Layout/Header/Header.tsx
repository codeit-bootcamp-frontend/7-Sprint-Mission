import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import { getActiveLinkStyle, getLinkStyle } from "@/utils/Utils";
import userImage from "@/assets/images/icons/ic_user.svg";
import logoImg from "@/assets/images/icons/panda-market-logo.svg";
import { useEffect, useState } from "react";
import Button from "../Button";

const Header = () => {
  const location = useLocation();
  const isAddItemPage = location.pathname === "/additem";
  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, [location]);

  return (
    <>
      {!isLoginOrSignupPage && (
        <header className="nav">
          <div id="logo-menu">
            <Link to="/">
              <img src={logoImg} alt="판다마켓 로고" />
            </Link>
            <div className="menu-area">
              <div className="menu">
                <h3>
                  <NavLink
                    to="/boards"
                    style={() => getActiveLinkStyle(["/boards", "/board"])}
                  >
                    자유게시판
                  </NavLink>
                </h3>
              </div>
              <div className="menu">
                <h3>
                  <NavLink
                    to="/items"
                    style={
                      isAddItemPage
                        ? getLinkStyle({ isActive: true })
                        : getLinkStyle
                    }
                  >
                    중고마켓
                  </NavLink>
                </h3>
              </div>
            </div>
          </div>
          {!isLogin ? (
            <Button href="/login">로그인</Button>
          ) : (
            <img src={userImage} alt="유저 로그인 프로필" />
          )}
        </header>
      )}
    </>
  );
};

export default Header;
