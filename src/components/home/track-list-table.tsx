"use client";

import { FC } from "react";
import styles from "./styles/track-list-table.module.scss";
import MusicCard from "@/shared/ui/music-card";
import { ITrackData } from "@/shared/types/player-context.types";

interface ITrackListTableProps {
    list: ITrackData[] | undefined;
}

const TrackListTable: FC<ITrackListTableProps> = ({ list }) => {
    return (
        <div className={styles.table}>
            <div className={styles.table__header}>
                <div className={styles.table__head}>Place</div>
                <div className={styles.table__head}>Title</div>
                <div className={styles.table__head}>Artist</div>
                <div className={styles.table__head}>Duration</div>
                <div className={styles.table__head}>Date</div>
            </div>
            {list ? (
                <ul className={styles.table__body}>
                    {list.map((item, index) => (
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
