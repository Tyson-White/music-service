import PreviousIcon from "@/components/ui/svg/previous-icon";
import PauseIcon from "@/components/ui/svg/pause-icon";
import PlayIcon from "@/components/ui/svg/play-icon";
import { formatTime } from "@/shared/lib/track-time";
import styles from "./styles/timelime-control.module.scss";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "@/components/providers/player-provider";
import Slider from "@/components/ui/slider";

const TimelimeControl = () => {
  const playerContext = useContext(PlayerContext);
  const trackList = playerContext?.trackList;
  const trackData = playerContext?.trackData;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [changing, setChanging] = useState(false);
  const [trackTime, setTrackTime] = useState(0);

  const startMonitoringTime = () => {
    if (playerContext?.file) {
      timerRef.current = setInterval(() => {
        setTrackTime(playerContext?.file.currentTime || 0);
      }, 1);
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

  const currentIndexInTrackList =
    !trackData || !trackList ? -1 : trackList.findIndex((track) => track.id === trackData.id);

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
  return (
    <div className={styles.controlElements}>
      <div className={styles.controlElements__buttons}>
        <button onClick={handlePrevPress} className={styles.controlElements__previuos}>
          <PreviousIcon className={"icon"} />
        </button>
        <button
          onClick={playerContext?.togglePlay}
          data-state={playerContext?.isPlay}
          className={styles.controlElements__trackState}
        >
          {playerContext?.isPlay ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
        </button>

        <button onClick={handleNextPress} className={styles.controlElements__next}>
          <PreviousIcon className={"icon"} />
        </button>
      </div>

      <div className={styles.controlElements__timeline}>
        <span className={styles.controleElements__timeDuration}>{formatTime(trackTime)}</span>
        <Slider
          className={styles.controlElements__range}
          onMouseDown={() => setChanging(true)}
          onMouseUp={() => onEndChangeTime()}
          value={trackTime}
          onChange={changeTime}
          max={playerContext?.file.duration}
          type="range"
        />
        {/* <input className={styles.controlElements__range} /> */}
        <span className={styles.controleElements__timeDuration}>{formatTime(playerContext?.file.duration || 0)}</span>
      </div>
    </div>
  );
};

export default TimelimeControl;
