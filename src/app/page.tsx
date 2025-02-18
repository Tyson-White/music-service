"use client";

import StartPanel from "@/components/pages/home/start-panel";

import styles from "@/components/pages/home/styles/home.module.scss";
import TrackListTable from "@/components/pages/home/track-list-table";
import { PlayerContext } from "@/components/providers/player-provider";
import { useContext } from "react";

export default function Home() {
  const playerContext = useContext(PlayerContext);

  return (
    <div className={"content-container " + styles.home}>
      <StartPanel />

      <div className={styles.home__grid}>
        <TrackListTable list={playerContext?.trackList} />
      </div>
    </div>
  );
}
