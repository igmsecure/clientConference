import { useState, useEffect, useRef } from "react";
import { MenuButton } from "../MenuButton/MenuButton";
import { useClickOutside } from "./hooks/useClickOutside";
import "./Navbar.css";
import draftCartSvg from "./icons/draftIcons.svg";
import userSvg from "./icons/profileIcon.svg";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { RootState } from "../../modules/store/store";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";
import { clearAuthData } from "../../modules/store/authSlice";
import { clearArticleId } from "../../modules/store/actions";




import Cookies from "universal-cookie";
const cookies = new Cookies();

interface NavbarProps {
  articleID?: number; // Опциональный параметр articleID
}

export const Navbar: React.FC<NavbarProps> = ({ articleID }) => {

  const [v, sV] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isModerator = useSelector((state: RootState) => state.auth.isModerator);
  const user = useSelector((state: RootState) => state.auth);


  const location = useLocation();
  const isAuthorsPage = location.pathname === '/authors';

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logout = async () => {
    try {
      await axios(`http://localhost:8000/api/auth/logout/`, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      });
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });

      dispatch(clearAuthData());
      dispatch(clearArticleId());

      navigate("/");
    } catch {
      console.log("Ошибка при выходе из аккаунта");
    }
  };

  const [isOpen, setOpen] = useState(Boolean);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });

  useEffect(() => {
    let startTouchX = 0;
    let endTouchX = 0;
    let startTouchY = 0;
    let endTouchY = 0;

    document.addEventListener("touchstart", (event) => {
      startTouchX = event.changedTouches[0].pageX;
      startTouchY = event.changedTouches[0].pageY;
    });

    document.addEventListener("touchend", (event) => {
      endTouchX = event.changedTouches[0].pageX;
      endTouchY = event.changedTouches[0].pageY;
      if (
        startTouchX < 100 &&
        Math.abs(endTouchY - startTouchY) < 40 &&
        endTouchX > startTouchX
      )
        setOpen(true);
      if (
        startTouchX < 240 &&
        Math.abs(endTouchY - startTouchY) < 40 &&
        endTouchX < startTouchX
      )
        setOpen(false);
    });
  }, []);

  const handleSubmit = async () => {
    await logout();
  };

  return (

    <header className="header">

      <span className="header__logo">
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <div><strong>МГТУ-Конференции</strong></div>
        </Link>
      </span>


      <nav className={`header__nav ${isOpen ? "active" : ""}`} ref={menuRef}>


        {/* <div className="header-nav-mobile"> */}

        <ul className="header__nav-list">



          {!isAuth && (
            <li className="header__nav-item">

              <Link
                to="/auth/login" >
                Войти
              </Link>

            </li>
          )}

          {isAuth && (
            <li className="header__nav-item">

              <Link
                to="/articles" >
                Статьи
              </Link>

            </li>
          )}

          {isModerator && (
            <li className="header__nav-item">

              <Link
                to="/authorsManage">
                Авторы
              </Link>

            </li>
          )}

          {isAuth && (
            <li className="header__nav-item user-menu-info user-menu-info-name">


              Привет, <span className="menu-user-name">{user.username}</span>


            </li>
          )}

          {isAuth && (
            <li className="header__nav-item user-menu-info user-menu-item-logout">

              <div className="logout" onClick={handleSubmit}>
                Выйти
              </div>

            </li>
          )}

        </ul>


        {/* </div> */}

      </nav>



      <div className="mobile-menu-head-icon">

        {isAuthorsPage && isAuth && !isModerator && (
          <Link to={`/article/${articleID}`}>
            <div className="draft-cart">

              <button
                className="draft-cart-button"
                disabled={articleID === 0}
                style={{ backgroundColor: articleID === 0 ? '#d6d3d388' : 'white' }}
              >
                <img className="draft-cart-img" src={draftCartSvg} alt="Cart" />
              </button>


            </div>
          </Link>
        )}

        <div className="user-info-head-menu">

          {isAuth && (
            <li className="header__nav-item">


              Привет,  <span className="menu-user-name">{user.username}</span>


            </li>
          )}

          {isAuth && (
            <li className="header__nav-item user-menu-info-logout">

              <div className={styles.menu__login} onClick={handleSubmit}>
                Выйти
              </div>

            </li>
          )}
        </div>

        <MenuButton isActive={isOpen} onClick={() => setOpen(!isOpen)} />

      </div>

    </header>


  );
};
