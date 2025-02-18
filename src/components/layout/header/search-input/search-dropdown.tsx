"use client";

import { useContext } from "react";
import DropdownItem from "./dropdown-item";
import styles from "./styles/search-dropdown.module.scss";
import { PlayerContext } from "@/components/providers/player-provider";
import { filterTrackList } from "@/shared/lib/array-filters";

const SearchDropdown = ({ searchIsOpen = false, searchValue = "" }) => {
  const playerContext = useContext(PlayerContext);
  const filteredList = filterTrackList(playerContext?.trackList, searchValue);

  return (
    <div className={styles.dropdown + ` ${filteredList.length > 0 && searchIsOpen ? styles.dropdown_show : ""}`}>
      {filteredList.map((item) => (
        <DropdownItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchDropdown;
