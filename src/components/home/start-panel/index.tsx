"use client";

import { useContext, useEffect, useState } from "react";
import TrackDisk from "./track-disk";
import { PlayerContext } from "@/components/provider/player-provider";

import styles from "./styles/start-panel.module.scss";
import ArrowIcon from "@/shared/ui/svg/arrow-icon";

export default function StartPanel() {
    const playerContext = useContext(PlayerContext);

    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

    const handleSlideLeft = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        }
    };

    const handleSlideRight = () => {
        if (playerContext && currentTrackIndex < playerContext?.trackList.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        }
    };

    useEffect(() => {
        if (playerContext && playerContext.trackList.length > 3) {
            setCurrentTrackIndex(playerContext.trackList.length / 2);
        }
    }, [playerContext]);

    if (!playerContext?.trackList) return;

    return (
        <div className={styles.startPanel}>
            <button
                onClick={handleSlideLeft}
                className={styles.startPanel__button + " " + styles.startPanel__button_left}
            >
                <ArrowIcon className="icon" />
            </button>
            <div
                style={{ transform: `translate(${-currentTrackIndex * 100}%, 0)` }}
                className={styles.startPanel__trackSlider}
            >
                {playerContext?.trackList.map((item, index) => (
                    <TrackDisk
                        currentIndex={currentTrackIndex}
                        index={index}
                        setCurrentIndex={setCurrentTrackIndex}
                        key={item.id}
                        {...item}
                    />
                ))}
            </div>
            <button
                onClick={handleSlideRight}
                className={styles.startPanel__button + " " + styles.startPanel__button_right}
            >
                <ArrowIcon className="icon" />
            </button>
        </div>
    );
}
