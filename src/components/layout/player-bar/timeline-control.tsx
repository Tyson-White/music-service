import PreviousIcon from "@/components/ui/svg/previous-icon";
import PauseIcon from "@/components/ui/svg/pause-icon";
import PlayIcon from "@/components/ui/svg/play-icon";
import { formatTime } from "@/shared/lib/track-time";
import styles from "./styles/timelime-control.module.scss";
import useTimelineControl from "@/shared/hooks/useTimelineControl";
import Timeline from "@/components/reusable/timeline";

const TimelineControl = () => {
  const { audio, isPlay, handleNextPress, handlePrevPress, trackTimerValue, togglePlay } = useTimelineControl();
  console.log(trackTimerValue);
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
        <Timeline
          wrapperClassName={styles.controlElements__timelineWrapper}
          className={styles.controlElements__timelineRange}
        />
        <span className={styles.controleElements__timeDuration}>{formatTime(audio?.duration || 0)}</span>
      </div>
    </div>
  );
};

export default TimelineControl;
