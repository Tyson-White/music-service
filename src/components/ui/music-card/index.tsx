"use client";

import styles from "./styles/music-card.module.scss";
import PlayIcon from "../svg/play-icon";
import PauseIcon from "../svg/pause-icon";
import { useContext } from "react";
import { PlayerContext } from "@/components/providers/player-provider";
import { ITrackData } from "@/shared/types/player-context.types";

interface IMusicCardProps extends ITrackData {
  className?: string;
  place: number;
}

export default function MusicCard(props: IMusicCardProps) {
  const { id, name, author, place, duration, date } = props;
  const playerContext = useContext(PlayerContext);

  const isCurrentTrack = playerContext?.trackData?.id === id;
  const isPlaying = playerContext?.isPlay && isCurrentTrack;

  const handlePressAction = () => {
    if (!isCurrentTrack) {
      playerContext?.setTrackData(props);
      return;
    }

    playerContext.togglePlay();
  };

  return (
    <div onClick={handlePressAction} className={styles.musicCard}>
      <div className={styles.musicCard__item + " " + styles.musicCard__item_place}>
        <span className={styles.musicCard__placeText + ` ${isPlaying ? styles.musicCard__placeText_hidden : ""}`}>
          {place}
        </span>
        <div className={styles.musicCard__playButton + ` ${!isPlaying ? styles.musicCard__playButton_hidden : ""}`}>
          {isPlaying ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
        </div>
      </div>
      <div className={styles.musicCard__item + " " + styles.musicCard__item_name}>{name}</div>
      <div className={styles.musicCard__item + " " + styles.musicCard__item_artist}>{author}</div>
      <div className={styles.musicCard__item + " " + styles.musicCard__item_duration}>{duration}</div>
      <div className={styles.musicCard__item + " " + styles.musicCard__item_date}>{date}</div>
    </div>
  );
}
