import css from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={css.hero}>
      <div className={css.hero_left}>
        <div className={css.left_inner}>
          <div className={css.inner_text}>
            <h1 className={css.title}>Make Life Easier for the Family:</h1>
            <p className={css.text}>
              Find Babysitters Online for All Occasions
            </p>
          </div>
          <button className={css.btn}>
            Get started<span className={css.spn}>↗</span>
          </button>
        </div>
      </div>
      <div className={css.hero_right}>
        <div className={css.badge}>
          <div className={css.badge_icon}>
            <svg width={30} height={30}>
              <use href="/sprite.svg#icon-fe_check"></use>
            </svg>
          </div>
          <div className={css.badge_text}>
            <p className={css.badge_text_nannies}>Experienced nannies</p>
            <span className={css.badge_text_span}>15,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
