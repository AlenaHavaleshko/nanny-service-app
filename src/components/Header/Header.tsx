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

  const openLogin = () => {
    setModalType("login");
    openModal();
  };

  const openRegistration = () => {
    setModalType("register");
    openModal();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: page === "/nannies" ? "red" : "transparent",
  };

  return (
    <div className={css.header} style={headerStyle}>
      <div className={css.logo}>
        <Link to="/home" aria-label="Home" className={css.logo_text}>
          Nanny.Services
        </Link>
      </div>
      <div className={css.menu}>
        <nav className={css.nav}>
          <ul className={css.navigation}>
            <li>
              <Link className={css.nav_text} to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className={css.nav_text} to="/nannies">
                Nannies
              </Link>
            </li>
            {user && (
              <li>
                <Link className={css.nav_text} to="/favorites">
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
  );
}
