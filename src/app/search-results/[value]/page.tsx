"use client";

import TrackListTable from "@/components/pages/home/track-list-table";
import { PlayerContext } from "@/components/providers/player-provider";
import styles from "@/components/pages/search-results/styles/search-results.module.scss";
import { filterTrackList } from "@/shared/lib/array-filters";
import { useContext } from "react";

const page = ({ params }) => {
  const playerContext = useContext(PlayerContext);

  const filtredTrackList = filterTrackList(playerContext?.trackList, params.value);

  return (
    <div className={"content-container " + styles.searchResultsPage}>
      <p className={styles.searchResultsPage__title}>Search results by "{params.value}"</p>
      <TrackListTable list={filtredTrackList} />
    </div>
  );
};

export default page;
