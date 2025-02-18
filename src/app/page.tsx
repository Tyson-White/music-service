"use client";

import StartPanel from "@/components/pages/home/start-panel";

import styles from "@/components/pages/home/styles/home.module.scss";
import TrackListTable from "@/components/pages/home/track-list-table";
import usePlayerStore from "@/shared/store/player-store";

export default function Home() {
  const trackList = usePlayerStore((state) => state.usingTrackList);

  return (
    <div className={"content-container " + styles.home}>
      <StartPanel />

      <div className={styles.home__grid}>
        <TrackListTable list={trackList} />
      </div>
    </div>
  );
}
