import Image from "next/image";
import styles from "./styles/track-control.module.scss";
import useTimelineControl from "@/shared/hooks/useTimelineControl";
import PauseIcon from "@/components/ui/svg/pause-icon";
import PlayIcon from "@/components/ui/svg/play-icon";
import PreviousIcon from "@/components/ui/svg/previous-icon";

const TrackControl = () => {
  const { trackData, isPlay, togglePlay, handleNextPress } = useTimelineControl();

  return (
    <div className={styles.control}>
      <div className={styles.control__image}>
        {trackData?.image && (
          <Image src={trackData?.image} fill objectFit="cover" alt={trackData?.name + " " + trackData?.author} />
        )}
      </div>
      <div className={styles.control__info}>
        <p className={styles.control__name}>{trackData?.name}</p>
        <p className={styles.control__author}>{trackData?.author}</p>
      </div>

      <button onClick={togglePlay} className={styles.control__trackState}>
        {isPlay ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
      </button>
      <button onClick={handleNextPress} className={styles.control__next}>
        <PreviousIcon className={"icon"} />
      </button>
    </div>
  );
};

export default TrackControl;
