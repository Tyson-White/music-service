import { FC, InputHTMLAttributes, useEffect } from "react";

import styles from "./styles/timeline.module.scss";
import useTimelineControl from "@/shared/hooks/useTimelineControl";

const Timeline: FC<
  InputHTMLAttributes<HTMLInputElement> & { wrapperClassName?: string; progressBarClassName?: string }
> = ({ className, wrapperClassName, progressBarClassName }) => {
  const {
    audio,
    timelineIsChanging,
    isPlay,
    stopMonitoringTime,
    startMonitoringTime,
    trackTimerValue,
    setTimelineIsChanging,
    onEndChangeTime,
    changeTime,
  } = useTimelineControl();

  useEffect(() => {
    if (timelineIsChanging || !isPlay) {
      stopMonitoringTime();
    } else {
      startMonitoringTime();
    }

    return () => {
      stopMonitoringTime();
    };
  }, [timelineIsChanging, isPlay]);

  return (
    <div className={styles.rangerWrapper + " " + wrapperClassName}>
      <div
        className={styles.progressBar + " " + progressBarClassName}
        style={{ width: (100 / Number(audio?.duration)) * Number(trackTimerValue) + "%" }}
      />

      <input
        onMouseDown={() => setTimelineIsChanging(true)}
        onMouseUp={() => onEndChangeTime()}
        value={trackTimerValue}
        onChange={changeTime}
        min={0}
        max={audio?.duration}
        className={styles.range + " " + className}
        type="range"
      />
    </div>
  );
};

export default Timeline;
