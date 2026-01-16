import { useState, useRef, useEffect } from "react";
import css from "./SelectInput.module.css";

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
}

export default function SelectInput({
  value,
  onChange,
  options,
  placeholder = "Select time",
  error,
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  const chooseOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
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
    <div className={css.select_wrapper} ref={selectRef}>
      <button
        type="button"
        className={`${css.select_button} ${
          isOpen ? css.select_button_open : ""
        } ${error ? css.select_button_error : ""}`}
        onClick={toggle}
      >
        <span className={value ? css.selected_text : css.placeholder_text}>
          {value || placeholder}
        </span>
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
              className={`${css.option} ${
                value === option ? css.option_selected : ""
              }`}
              onClick={() => chooseOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
