import PreviousIcon from "@/components/ui/svg/previous-icon";
import PauseIcon from "@/components/ui/svg/pause-icon";
import PlayIcon from "@/components/ui/svg/play-icon";
import styles from "./styles/timelime-control.module.scss";
import useTimelineControl from "@/shared/hooks/useTimelineControl";

const TimelineControl = () => {
  const { isPlay, handleNextPress, handlePrevPress, togglePlay } = useTimelineControl();

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
    </div>
  );
};

export default TimelineControl;
