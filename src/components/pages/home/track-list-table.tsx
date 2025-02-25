"use client";

import { FC } from "react";
import styles from "./styles/track-list-table.module.scss";
import MusicCard from "@/components/ui/music-card";
import { ITrackData } from "@/shared/types/player-context.types";
import usePlaylistsStore from "@/shared/store/playlists-store";

interface ITrackListTableProps {
  list: ITrackData[] | undefined;
}

const TrackListTable: FC<ITrackListTableProps> = ({ list }) => {
  const { playlists } = usePlaylistsStore();

  return (
    <div className={styles.table}>
      <div className={styles.table__header + " desktop"}>
        <div className={styles.table__head}>Place</div>
        <div className={styles.table__head}>Title</div>
        <div className={styles.table__head}>Artist</div>
        <div className={styles.table__head}>Duration</div>
        <div className={styles.table__head}>Listening</div>
      </div>
      <div className="mobile">All tracks</div>
      {playlists.main ? (
        <ul className={styles.table__body}>
          {playlists.main.map((item, index) => (
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
