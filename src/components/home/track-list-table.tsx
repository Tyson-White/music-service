"use client";

import { useContext } from "react";
import styles from "./styles/track-list-table.module.scss";
import { PlayerContext } from "../provider/player-provider";
import MusicCard from "@/shared/ui/music-card";

const TrackListTable = () => {
  const playerContext = useContext(PlayerContext);

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div className={styles.table__head}>Place</div>
        <div className={styles.table__head}>Title</div>
        <div className={styles.table__head}>Artist</div>
        <div className={styles.table__head}>Duration</div>
        <div className={styles.table__head}>Date</div>
      </div>
      {playerContext?.trackList ? (
        <ul className={styles.table__body}>
          {playerContext.trackList.map((item, index) => (
            <MusicCard key={item.id} place={index + 1} {...item} />
          ))}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};

export default TrackListTable;
