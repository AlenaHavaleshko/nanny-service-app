import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";

const options = [
  "A to Z",
  "Z to A",
  "Less than 10$",
  "Greater than 10$",
  "Popular",
  "Not popular",
  "Show all",
];

interface CustomSelectProps {
  onFilterChange?: (filter: string) => void;
}

export default function CustomSelect({ onFilterChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Popular");
  const selectRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  const chooseOption = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.filter}>
      <p className={css.filter_text}>Filters</p>
      <form className={css.form}>
        <div className={css.custom_select} ref={selectRef}>
          <button
            type="button"
            className={`${css.select_button} ${
              isOpen ? css.select_button_open : ""
            }`}
            onClick={toggle}
          >
            {selected}
            <svg
              width="20"
              height="20"
              className={`${css.arrow} ${isOpen ? css.arrow_open : ""}`}
            >
              <use href="/sprite.svg#icon-down" />
            </svg>
          </button>

          {isOpen && (
            <ul className={css.options}>
              {options.map((option) => (
                <li
                  key={option}
                  className={css.option}
                  onClick={() => chooseOption(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
