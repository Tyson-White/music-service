"use client";

import TrackListTable from "@/components/pages/home/track-list-table";
import styles from "@/components/pages/search-results/styles/search-results.module.scss";
import { filterTrackList } from "@/shared/lib/array-filters";
import usePlayerStore from "@/shared/store/player-store";
import { useParams } from "next/navigation";

const Page = () => {
  const { value } = useParams();

  const { usingTrackList } = usePlayerStore();
  const decodedValue = typeof value === "string" ? decodeURIComponent(value) : "";
  const filtredTrackList = filterTrackList(usingTrackList, decodedValue);

  return (
    <div className={"content-container " + styles.searchResultsPage}>
      <p className={styles.searchResultsPage__title}>Search results by &quot;{decodedValue}&quot;</p>
      <TrackListTable list={filtredTrackList} />
    </div>
  );
};

export default Page;
