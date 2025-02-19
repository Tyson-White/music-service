import { KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./styles/search-input.module.scss";
import SearchIcon from "@/components/ui/svg/search-icon";
import CrossIcon from "@/components/ui/svg/cross-icon";
import SearchDropdown from "./search-dropdown";
import { useRouter } from "next/navigation";

interface ISearchInput {
  isActive: boolean;
  toggler: (state: boolean) => void;
}

export default function SearchInput({ isActive, toggler }: ISearchInput) {
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const clearInputValue = () => inputValue.length > 0 && setInputValue("");

  const onSearch = () => {
    if (inputValue.length < 0) return;
    router.push(`/search-results/${inputValue}`);
    toggler(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && onSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchRef.current) return;

      if (event.composedPath().includes(searchRef.current)) return;

      toggler(false);
      document.removeEventListener("click", handleClickOutside);
    };

    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive, searchRef]);

  return (
    <>
      <button
        onClick={() => toggler(!isActive)}
        className={styles.search__button + ` ${isActive ? styles.hidden : ""}`}
      >
        <SearchIcon className={"icon"} />
      </button>
      <div ref={searchRef} className={styles.search + ` ${isActive ? styles.search_opened : ""}`}>
        <input
          onKeyDown={handleEnter}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className={styles.search__input}
          placeholder="Enter something..."
        />
        <button onClick={clearInputValue} className={"icon " + styles.indicator}>
          <SearchIcon className={`${styles.indicator__icon} ${inputValue.length > 0 ? "hidden" : "show"}`} />
          <CrossIcon className={`${styles.indicator__icon} ${inputValue.length > 0 ? "show" : "hidden"}`} />
        </button>
        <button onClick={onSearch} className={styles.search__hide}>
          Search
        </button>
        <SearchDropdown searchIsOpen={isActive} searchValue={inputValue} />
      </div>
    </>
  );
}
