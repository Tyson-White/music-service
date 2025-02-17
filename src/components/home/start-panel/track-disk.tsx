import { ITrackData } from "@/shared/types/player-context.types";
import styles from "./styles/track-disk.module.scss";
import { FC } from "react";
import Image from "next/image";

interface ITrackDiskProps extends ITrackData {
  index: number;
  currentIndex: number;
}

const SIZE_RATE = 0.15;

const TrackDisk: FC<ITrackDiskProps> = ({ index, name, author, image, currentIndex }) => {
  const diskOffset = Math.abs(currentIndex - index);
  const diskSize = 1 - diskOffset * SIZE_RATE;

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
    <div className={styles.diskWrapper}>
      <div
        style={{
          transform: `scale(${diskSize}) translate(${calculateDiskOffset()}, 0)`,
          zIndex: currentIndex === index ? 100 : 1,
          opacity: diskOffset === 1 ? 0.5 : diskOffset > 1 ? 0 : 1,
        }}
        className={styles.disk}
      >
        <Image src={image} fill objectFit="cover" alt={name + "-" + author} />
        <div className={styles.disk__centerCircle} />
      </div>
      <div className={styles.trackInfo + ` ${currentIndex !== index ? styles.trackInfo_hidden : ""}`}>
        <p className={styles.trackInfo__name}>{name}</p>
        <p className={styles.trackInfo__author}>{author}</p>
      </div>
    </div>
  );
};

export default TrackDisk;
