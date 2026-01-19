import css from "./Notification.module.css";
import { useModal } from "../ModalContext/UseModal";

export default function Notification() {
  const { notification, closeNotification } = useModal();

  if (!notification) return null;

  return (
    <div className={css.notification}>
      <div className={css.content}>
        <p className={css.message}>{notification}</p>
        <button
          className={css.close_btn}
          onClick={closeNotification}
          aria-label="Close notification"
        >
          <svg width={16} height={16} className={css.close_icon}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
