"use client";

import { useEffect, useState } from "react";
import TrackDisk from "./track-disk";

import styles from "./styles/start-panel.module.scss";
import ArrowIcon from "@/components/ui/svg/arrow-icon";
import usePlayerStore from "@/shared/store/player-store";

export default function StartPanel() {
  const trackList = usePlayerStore((state) => state.usingTrackList);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const isFirstTrackInList = currentTrackIndex === 0;
  const isLastTrackInList = currentTrackIndex < trackList.length - 1;

  const handleSlideLeft = () => {
    if (!isFirstTrackInList) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const handleSlideRight = () => {
    if (isLastTrackInList) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  useEffect(() => {
    if (trackList.length > 3) {
      setCurrentTrackIndex(trackList.length / 2);
    }
  }, [trackList]);

  if (!trackList) return;

  return (
    <div className={styles.startPanel}>
      {
        <button
          onClick={handleSlideLeft}
          className={`${styles.startPanel__button} ${styles.startPanel__button_left} ${
            isFirstTrackInList ? styles.startPanel__button_hidden : ""
          }`}
        >
          <ArrowIcon className="icon" />
        </button>
      }
      <div
        style={{ transform: `translate(${-currentTrackIndex * 100}%, 0)` }}
        className={styles.startPanel__trackSlider}
      >
        {trackList.map((item, index) => (
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
        className={`${styles.startPanel__button} ${styles.startPanel__button_right} ${
          !isLastTrackInList ? styles.startPanel__button_hidden : ""
        }`}
      >
        <ArrowIcon className="icon" />
      </button>
    </div>
  );
}
