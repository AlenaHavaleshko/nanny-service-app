import { useTheme } from "../ThemeContext/useTheme";
import css from "./ThemeSwitcher.module.css";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={css.theme_switcher}>
      <button
        className={`${css.theme_btn} ${theme === "red" ? css.active : ""}`}
        onClick={() => setTheme("red")}
        aria-label="Red theme"
        style={{ backgroundColor: "#f03f3b" }}
      />
      <button
        className={`${css.theme_btn} ${theme === "blue" ? css.active : ""}`}
        onClick={() => setTheme("blue")}
        aria-label="Blue theme"
        style={{ backgroundColor: "#0957c3" }}
      />
      <button
        className={`${css.theme_btn} ${theme === "green" ? css.active : ""}`}
        onClick={() => setTheme("green")}
        aria-label="Green theme"
        style={{ backgroundColor: "#103931" }}
      />
    </div>
  );
}
