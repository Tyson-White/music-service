import Image from "next/image";
import styles from "./styles/track-information.module.scss";
import usePlayerStore from "@/shared/store/player-store";

const TrackInformation = () => {
  const { trackData } = usePlayerStore();

  return (
    <div className={styles.trackInfo}>
      <div className={styles.trackInfo__image}>
        <Image src={trackData?.image || ""} fill objectFit="cover" alt={trackData?.name || ""} />
      </div>
      <div className={styles.trackInfo__titles}>
        <p className={styles.trackInfo__name}>{trackData?.name}</p>
        <p className={styles.trackInfo__author}>{trackData?.author}</p>
      </div>
    </div>
  );
};

export default TrackInformation;
