import Hero from "../../components/Hero/Hero";
import css from "./Home.module.css";

export default function Home() {
  return (
    <div className={css.home}>
      <Hero />
    </div>
  );
}
