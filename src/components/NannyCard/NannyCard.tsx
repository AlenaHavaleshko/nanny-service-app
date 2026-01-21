import css from "./NannyCard.module.css";
import type { Nanny } from "../../types/types";
import { useModal } from "../ModalContext/UseModal";
import { useFavorites } from "../FavoritesContext/useFavorites";
import { useAuth } from "../AuthContext/useAuth";
import { useState } from "react";

interface NannyProps {
  nanny: Nanny;
}

export default function NannyCard({ nanny }: NannyProps) {
  const { openModalWithNanny, showNotification } = useModal();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const [showReviews, setShowReviews] = useState(false);

  const handleFavoriteClick = () => {
    if (user) {
      toggleFavorite(nanny.id);
    } else {
      showNotification(
        "This functionality is available only to authorized users. Please log in or register."
      );
    }
  };

  const handleAppointmentClick = () => {
    openModalWithNanny(nanny);
  };

  function calcAge(isoDate: string) {
    const birth = new Date(isoDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className={css.card}>
      <button className={css.favor_btn} onClick={handleFavoriteClick}>
        <svg className={css.favorite_icon} width={27} height={27}>
          <use
            href={`/sprite.svg#${
              isFavorite(nanny.id) ? "icon-Property-1Hover" : "icon-favour-black"
            }`}
          ></use>
        </svg>
      </button>
      <div className={css.image_box}>
        <svg className={css.image_icon} width={14} height={14}>
          <use href="/sprite.svg#icon-point"></use>
        </svg>
        <img
          className={css.avatar}
          src={nanny.avatar_url}
          alt={nanny.name}
          width={96}
          height={96}
        ></img>
      </div>
      <div className={css.all_text}>
        <div className={css.all_text_one}>
          <div className={css.box_name}>
            <p className={css.box_name_text}>Nanny</p>
            <p className={css.nanny_name}>{nanny.name}</p>
          </div>
          <div className={css.box_block}>
            <div className={css.address}>
              <svg className={css.block_icon} width={16} height={16}>
                <use href="/sprite.svg#icon-Location"></use>
              </svg>
              <p className={css.block_text}>{nanny.location}</p>
            </div>
            <span className={css.box_block_span}>|</span>
            <div className={css.rating}>
              <svg className={css.block_icon} width={16} height={16}>
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              <p className={css.block_text}>Rating: {nanny.rating}</p>
            </div>
            <span className={css.box_block_span}>|</span>
            <div className={css.price}>
              <p className={css.block_text}>
                Price / 1 hour:{" "}
                <span className={css.span_green}>{nanny.price_per_hour}$</span>
              </p>
            </div>
          </div>
        </div>
        <div className={css.all_text_second}>
          <div className={css.age}>
            <p className={css.private_text}>
              Age:{" "}
              <span className={css.span_age}>{calcAge(nanny.birthday)}</span>
            </p>
          </div>
          <div className={css.experience}>
            <p className={css.private_text}>
              Experience:{" "}
              <span className={css.span_text_info}>{nanny.experience}</span>
            </p>
          </div>
          <div className={css.kids_age}>
            <p className={css.private_text}>
              Kids Age:{" "}
              <span className={css.span_text_info}>{nanny.kids_age}</span>
            </p>
          </div>
          <div className={css.characters}>
            <p className={css.private_text}>
              Characters:{" "}
              <span className={css.span_text_info}>{nanny.characters}</span>
            </p>
          </div>
          <div className={css.education}>
            <p className={css.private_text}>
              Education:{" "}
              <span className={css.span_text_info}>{nanny.education}</span>
            </p>
          </div>
        </div>
        <p className={css.about}>{nanny.about}</p>
        <button
          type="button"
          className={css.brn_more}
          onClick={() => setShowReviews((prev) => !prev)}
        >
          {showReviews ? "Hide" : "Read more"}
        </button>
        {showReviews && (
          <div className={css.review}>
            {nanny.reviews?.map((review, index) => (
              <div className={css.review_info} key={index}>
                <div className={css.review_name}>
                  <div className={css.name_one_letter}>
                    <p className={css.name_one_text}>{review.reviewer[0]}</p>
                  </div>
                  <div className={css.name_full}>
                    <p className={css.name_full_black}>
                      {review.reviewer.slice(0, 5)}.
                    </p>
                    <div className={css.name_wrapper}>
                      <svg
                        className={css.name_full_icon}
                        width={16}
                        height={16}
                      >
                        <use href="/sprite.svg#icon-star"></use>
                      </svg>
                      <p className={css.name_full_text}>{review.rating}</p>
                    </div>
                  </div>
                </div>
                <p className={css.review_comment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        {showReviews && (
          <div className={css.btn}>
            <button
              type="button"
              className={css.card_btn}
              onClick={handleAppointmentClick}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
