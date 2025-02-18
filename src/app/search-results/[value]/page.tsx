"use client";

import TrackListTable from "@/components/pages/home/track-list-table";
import styles from "@/components/pages/search-results/styles/search-results.module.scss";
import { filterTrackList } from "@/shared/lib/array-filters";
import usePlayerStore from "@/shared/store/player-store";

const page = ({ params }) => {
  const { usingTrackList } = usePlayerStore();

  const filtredTrackList = filterTrackList(usingTrackList, params.value);

  return (
    <div className={"content-container " + styles.searchResultsPage}>
      <p className={styles.searchResultsPage__title}>Search results by "{params.value}"</p>
      <TrackListTable list={filtredTrackList} />
    </div>
  );
};

export default page;
