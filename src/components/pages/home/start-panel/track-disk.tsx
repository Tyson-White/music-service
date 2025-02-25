import { ITrackData } from "@/shared/types/player-context.types";
import styles from "./styles/track-disk.module.scss";
import { FC } from "react";
import Image from "next/image";
import PauseIcon from "@/components/ui/svg/pause-icon";
import PlayIcon from "@/components/ui/svg/play-icon";
import usePlayerStore from "@/shared/store/player-store";
import ImagePlaceholder from "@/public/static/img/pic.jpeg";

interface ITrackDiskProps extends ITrackData {
  index: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const SIZE_RATE = 0.25;

const TrackDisk: FC<ITrackDiskProps> = (props) => {
  const { index, name, author, image, currentIndex, setCurrentIndex, id } = props;

  const diskOffset = Math.abs(currentIndex - index);
  const diskSize = 1 - diskOffset * SIZE_RATE;

  const { trackData, isPlay, setTrackData, togglePlay } = usePlayerStore();

  const isCurrentTrack = trackData?.id === id;
  const isPlaying = isPlay && isCurrentTrack;

  const handleClickPlay = () => {
    if (!isCurrentTrack) {
      setTrackData(props);
      setCurrentIndex(index);
    } else {
      togglePlay();
    }
  };

  const calculateDiskOffset = () => {
    // right side
    if (currentIndex - index < 0) {
      return `-${(1 - diskSize) * 100}%`;
    }

    // left side
    if (currentIndex - index > 0) {
      return `${(1 - diskSize) * 100}%`;
    }

    return 0;
  };

  return (
    <div onClick={handleClickPlay} className={styles.diskWrapper}>
      <div
        style={{
          transform: `scale(${diskSize}) translate(${calculateDiskOffset()}, 0)`,
          zIndex: currentIndex === index ? 100 : 1,
          opacity: diskOffset === 1 ? 0.5 : diskOffset > 1 ? 0 : 1,
        }}
        className={styles.disk}
      >
        <Image src={image || ImagePlaceholder} fill objectFit="cover" alt={name + "-" + author} />
        <div className={styles.disk__centerCircle}>
          {isPlaying ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
        </div>
      </div>
      <div className={styles.trackInfo + ` ${currentIndex !== index ? styles.trackInfo_hidden : ""}`}>
        <p className={styles.trackInfo__name}>{name}</p>
        <p className={styles.trackInfo__author}>{author}</p>
      </div>
    </div>
  );
};

export default TrackDisk;
