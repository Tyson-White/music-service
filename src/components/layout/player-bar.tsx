"use client";

import styles from "@/components/layout/styles/player-bar.module.scss";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../provider/player-provider";
import Image from "next/image";
import PreviousIcon from "@/shared/ui/svg/previous-icon";
import PauseIcon from "@/shared/ui/svg/pause-icon";
import PlayIcon from "@/shared/ui/svg/play-icon";
import { formatTime } from "@/shared/lib/track-time";
import ArrowIcon from "@/shared/ui/svg/arrow-icon";

const PlayerBar = () => {
  const playerContext = useContext(PlayerContext);
  const trackData = playerContext?.trackData;
  const trackList = playerContext?.trackList;
  const currentIndexInTrackList =
    !trackData || !trackList ? -1 : trackList.findIndex((track) => track.id === trackData.id);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [changing, setChanging] = useState(false);
  const [trackTime, setTrackTime] = useState(0);
  const [barIsShowing, setBarIsShowing] = useState(true);

  const handlePrevPress = () => {
    if (!trackList) return;

    if (currentIndexInTrackList > 0) {
      playerContext?.setTrackData(trackList[currentIndexInTrackList - 1]);
    }
  };

  const handleNextPress = () => {
    if (!trackList) return;

    if (currentIndexInTrackList < trackList.length - 1) {
      playerContext?.setTrackData(trackList[currentIndexInTrackList + 1]);
    }
  };

  const startMonitoringTime = () => {
    if (playerContext?.file) {
      timerRef.current = setInterval(() => {
        setTrackTime(playerContext?.file.currentTime || 0);
      }, 1000);
    }
  };

  const stopMonitoringTime = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const changeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackTime(Number(e.target.value));
  };

  const onEndChangeTime = () => {
    if (playerContext?.file) {
      playerContext.file.currentTime = trackTime;
    }

    setChanging(false);
  };

  useEffect(() => {
    if (changing) {
      stopMonitoringTime();
    } else {
      startMonitoringTime();
    }

    return () => {
      stopMonitoringTime();
    };
  }, [changing]);

  return (
    <div className={"content-container " + styles.playerBar + ` ${barIsShowing ? "" : styles.playerBar_hidden}`}>
      <button
        onClick={() => setBarIsShowing((prev) => !prev)}
        className={styles.playerBar__hideButton + ` ${!barIsShowing ? styles.playerBar__hideButton_rotate : ""}`}
      >
        <ArrowIcon className="icon" />
      </button>

      <div className={styles.trackInfo}>
        <div className={styles.trackInfo__image}>
          <Image src={trackData?.image || ""} fill objectFit="cover" alt={trackData?.name || ""} />
        </div>
        <div className={styles.trackInfo__titles}>
          <p className={styles.trackInfo__name}>{trackData?.name}</p>
          <p className={styles.trackInfo__author}>{trackData?.author}</p>
        </div>
      </div>

      <div className={styles.controlElements}>
        <div className={styles.controlElements__buttons}>
          <button onClick={handlePrevPress} className={styles.controlElements__previuos}>
            <PreviousIcon className={"icon"} />
          </button>
          <button onClick={playerContext?.togglePlay} className={styles.controlElements__trackState}>
            {playerContext?.isPlay ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
          </button>

          <button onClick={handleNextPress} className={styles.controlElements__next}>
            <PreviousIcon className={"icon"} />
          </button>
        </div>

        <div className={styles.controlElements__timeline}>
          <span className={styles.controleElements__timeDuration}>{formatTime(trackTime)}</span>
          <input
            onMouseDown={() => setChanging(true)}
            onMouseUp={() => onEndChangeTime()}
            min={0}
            value={trackTime}
            onChange={changeTime}
            max={playerContext?.file.duration}
            type="range"
          />
          <span className={styles.controleElements__timeDuration}>{formatTime(playerContext?.file.duration || 0)}</span>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default PlayerBar;
