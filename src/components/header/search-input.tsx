import { useState } from "react";
import styles from "./styles/search-input.module.scss";
import SearchIcon from "@/shared/ui/svg/search-icon";
import CrossIcon from "@/shared/ui/svg/cross-icon";

interface ISearchInput {
  isActive: boolean;
  toggler: (state: boolean) => void;
}

export default function SearchInput({ isActive, toggler }: ISearchInput) {
  const [inputValue, setInputValue] = useState<string>("");

  const clearInputValue = () => inputValue.length > 0 && setInputValue("");

  return (
    <>
      <button
        onClick={() => toggler(!isActive)}
        className={styles.search__button + ` ${isActive ? styles.hidden : ""}`}
      >
        <SearchIcon className={"icon"} />
      </button>
      <div className={styles.search + ` ${isActive ? styles.search_opened : ""}`}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className={styles.search__input}
          placeholder="Enter something..."
        />
        <button onClick={clearInputValue} className={"icon " + styles.indicator}>
          <SearchIcon className={`${styles.indicator__icon} ${inputValue.length > 0 ? "hidden" : "show"}`} />
          <CrossIcon className={`${styles.indicator__icon} ${inputValue.length > 0 ? "show" : "hidden"}`} />
        </button>
        <button className={styles.search__hide} onClick={() => toggler(!isActive)}>
          Hide
        </button>
      </div>
    </>
  );
}
