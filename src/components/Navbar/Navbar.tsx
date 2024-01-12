import { useState, useEffect, useRef } from "react";
import { MenuButton } from "../MenuButton/MenuButton";
import { useClickOutside } from "./hooks/useClickOutside";
import "./Navbar.css";
import draftCartSvg from "./icons/draftIcons.svg";
import userSvg from "./icons/profileIcon.svg";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { RootState } from "../../modules/store/store";
import { useLocation } from 'react-router-dom';
import DraftCart from '../DraftCart';



interface NavbarProps {
  articleID: number; // Опциональный параметр articleID
}

export const Navbar: React.FC<NavbarProps> = ({ articleID }) => {

  const [v, sV] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  const location = useLocation();
  const isAuthorsPage = location.pathname === '/authors';

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

        </ul>
        {/* </div> */}

      </nav>



      <div className="mobile-menu-head-icon">

        {isAuthorsPage && isAuth && (
          // <Link to={`/article/${articleID}`}>
          //   <div className="draft-cart">

          //     <button
          //       className="draft-cart-button"
          //       disabled={articleID === 0}
          //       style={{ backgroundColor: articleID === 0 ? '#d6d3d388' : 'white' }}
          //     >
          //       <img className="draft-cart-img" src={draftCartSvg} alt="Cart" />
          //     </button>


          //   </div>
          // </Link>
          <DraftCart articleID={articleID} />
        )}

        <div
          className={styles.user}
          onClick={() => {
            sV(!v);
          }}
        >
          <img src={userSvg} className="user-menu-img" alt="User" style={{ cursor: "pointer" }} />
          <AnimatePresence>
            {v && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className={styles.profileInfoContainer}
              >
                <ProfileInfo />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MenuButton isActive={isOpen} onClick={() => setOpen(!isOpen)} />

      </div>

    </header>


  );
};
