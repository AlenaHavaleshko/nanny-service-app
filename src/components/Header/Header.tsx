import { useState } from "react";
import css from "./Header.module.css";
import { Link } from "react-router-dom";
import { useModal } from "../ModalContext/UseModal";
import { useAuth } from "../AuthContext/useAuth";

interface HeaderProps {
  setModalType: (type: "login" | "register") => void;
  page: string;
}

export default function Header({ setModalType, page }: HeaderProps) {
  const { openModal } = useModal();
  const { user, logout } = useAuth();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurger = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurger = () => setIsBurgerOpen(false);

  const openLogin = () => {
    setModalType("login");
    openModal();
    closeBurger();
  };

  const openRegistration = () => {
    setModalType("register");
    openModal();
    closeBurger();
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeBurger();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const isColoredPage = page === "/nannies" || page === "/favorites";

  return (
    <div className={`${css.header} ${isColoredPage ? css.header_colored : ""}`}>
      <div className={css.header_inner}>
        <div className={css.logo}>
          <Link to="/home" aria-label="Home" className={css.logo_text}>
            Nanny.Services
          </Link>
        </div>
        <button
          className={css.burger_btn}
          onClick={toggleBurger}
          aria-label="Toggle menu"
        >
          <span
            className={`${css.burger_line} ${isBurgerOpen ? css.burger_open : ""}`}
          ></span>
          <span
            className={`${css.burger_line} ${isBurgerOpen ? css.burger_open : ""}`}
          ></span>
          <span
            className={`${css.burger_line} ${isBurgerOpen ? css.burger_open : ""}`}
          ></span>
        </button>
        <div className={`${css.menu} ${isBurgerOpen ? css.menu_open : ""}`}>
          <nav className={css.nav}>
            <ul className={css.navigation}>
              <li>
                <Link
                  className={`${css.nav_text} ${page === "/home" ? css.nav_active : ""}`}
                  to="/home"
                  onClick={closeBurger}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`${css.nav_text} ${page === "/nannies" ? css.nav_active : ""}`}
                  to="/nannies"
                  onClick={closeBurger}
                >
                  Nannies
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    className={`${css.nav_text} ${page === "/favorites" ? css.nav_active : ""}`}
                    to="/favorites"
                    onClick={closeBurger}
                  >
                    Favorites
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {user ? (
            <div className={css.user_profile}>
              <div className={css.user_info}>
                <svg width={24} height={24} className={css.user_icon}>
                  <use href="/sprite.svg#icon-mdi_user"></use>
                </svg>
                <span className={css.user_name}>
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                className={css.btn_logout}
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className={css.registration}>
              <button className={css.btn_log} type="button" onClick={openLogin}>
                Log In
              </button>
              <button
                className={css.btn_registration}
                type="button"
                onClick={openRegistration}
              >
                Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
