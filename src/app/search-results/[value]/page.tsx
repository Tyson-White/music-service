"use client";

import TrackListTable from "@/components/pages/home/track-list-table";
import styles from "@/components/pages/search-results/styles/search-results.module.scss";
import { filterTrackList } from "@/shared/lib/array-filters";
import usePlayerStore from "@/shared/store/player-store";
import { FC } from "react";

const page: FC<{ params: { value: string } }> = ({ params }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { usingTrackList } = usePlayerStore();
  const decodedValue = decodeURIComponent(params.value);
  const filtredTrackList = filterTrackList(usingTrackList, decodedValue);

  return (
    <div className={"content-container " + styles.searchResultsPage}>
      <p className={styles.searchResultsPage__title}>Search results by &quot;{decodedValue}&quot;</p>
      <TrackListTable list={filtredTrackList} />
    </div>
  );
};

export default page;
