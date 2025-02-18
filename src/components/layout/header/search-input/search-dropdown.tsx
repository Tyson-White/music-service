"use client";

import DropdownItem from "./dropdown-item";
import styles from "./styles/search-dropdown.module.scss";
import { filterTrackList } from "@/shared/lib/array-filters";
import usePlayerStore from "@/shared/store/player-store";

const SearchDropdown = ({ searchIsOpen = false, searchValue = "" }) => {
  const trackList = usePlayerStore((state) => state.usingTrackList);
  const filteredList = filterTrackList(trackList, searchValue);

  return (
    <div className={styles.dropdown + ` ${filteredList.length > 0 && searchIsOpen ? styles.dropdown_show : ""}`}>
      {filteredList.map((item) => (
        <DropdownItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchDropdown;
