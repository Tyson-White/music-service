"use client";

import StartPanel from "@/components/home/start-panel";

import styles from "@/components/home/styles/home.module.scss";
import TrackListTable from "@/components/home/track-list-table";
import { PlayerContext } from "@/components/provider/player-provider";
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
