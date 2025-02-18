import PreviousIcon from "@/components/ui/svg/previous-icon";
import PauseIcon from "@/components/ui/svg/pause-icon";
import PlayIcon from "@/components/ui/svg/play-icon";
import { formatTime } from "@/shared/lib/track-time";
import styles from "./styles/timelime-control.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Slider from "@/components/ui/slider";
import usePlayerStore from "@/shared/store/player-store";

const TimelineControl = () => {
  const { trackData, usingTrackList, audio, setTrackData, isPlay, togglePlay, trackTimerValue, setTrackTimerValue } =
    usePlayerStore();
  const trackList = usingTrackList;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [changing, setChanging] = useState(false);

  const startMonitoringTime = () => {
    if (audio) {
      timerRef.current = setInterval(() => {
        setTrackTimerValue(audio.currentTime || 0);
      }, 1);
    }
  };

  const stopMonitoringTime = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const changeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackTimerValue(Number(e.target.value));
  };

  const onEndChangeTime = () => {
    if (audio) {
      audio.currentTime = trackTimerValue;
    }

    setChanging(false);
  };

  useEffect(() => {
    if (changing || !isPlay) {
      stopMonitoringTime();
    } else {
      startMonitoringTime();
    }

    return () => {
      stopMonitoringTime();
    };
  }, [changing, isPlay]);

  const currentIndexInTrackList =
    !trackData || !trackList ? -1 : trackList.findIndex((track) => track.id === trackData.id);

  const handlePrevPress = () => {
    if (!trackList) return;

    if (currentIndexInTrackList > 0) {
      setTrackData(trackList[currentIndexInTrackList - 1]);
    }
  };

  const handleNextPress = () => {
    if (!trackList) return;

    if (currentIndexInTrackList < trackList.length - 1) {
      setTrackData(trackList[currentIndexInTrackList + 1]);
    }
  };
  return (
    <div className={styles.controlElements}>
      <div className={styles.controlElements__buttons}>
        <button onClick={handlePrevPress} className={styles.controlElements__previous}>
          <PreviousIcon className={"icon"} />
        </button>
        <button onClick={togglePlay} data-state={isPlay} className={styles.controlElements__trackState}>
          {isPlay ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
        </button>

        <button onClick={handleNextPress} className={styles.controlElements__next}>
          <PreviousIcon className={"icon"} />
        </button>
      </div>

      <div className={styles.controlElements__timeline}>
        <span className={styles.controleElements__timeDuration}>{formatTime(trackTimerValue)}</span>
        <Slider
          className={styles.controlElements__range}
          onMouseDown={() => setChanging(true)}
          onMouseUp={() => onEndChangeTime()}
          value={trackTimerValue}
          onChange={changeTime}
          max={audio.duration}
          type="range"
        />
        {/* <input className={styles.controlElements__range} /> */}
        <span className={styles.controleElements__timeDuration}>{formatTime(audio.duration || 0)}</span>
      </div>
    </div>
  );
};

export default TimelineControl;
