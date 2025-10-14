import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./CustomSelect.module.css";
import { translateCityName } from "@/utils/helper";

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (option) => {
    if (option === value) {
      onChange("");
    } else {
      onChange(option);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <div
        className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.selectedText : styles.placeholder}>
          {value ? translateCityName(value) : placeholder}
        </span>
        <Image
          src="/icons/arrow-down.svg"
          alt="dropdown"
          width={16}
          height={16}
          className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
        />
      </div>

      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`${styles.option} ${
                option === value ? styles.active : ""
              }`}
            >
              {translateCityName(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
