import { ITrackData } from "@/shared/types/player-context.types";
import PauseIcon from "../svg/pause-icon";
import PlayIcon from "../svg/play-icon";
import styles from "./styles/music-card-mobile.module.scss";
import usePlayerStore from "@/shared/store/player-store";
import { FC } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/public/static/img/pic.jpeg";

interface IMusicCardMobileProps extends ITrackData {
  className?: string;
  onToggleState: () => void;
}

const MusicCardMobile: FC<IMusicCardMobileProps> = (props) => {
  const { id, name, author, image, onToggleState } = props;
  const { isPlay, trackData } = usePlayerStore();
  const isCurrentTrack = trackData?.id === id;
  const isPlaying = isPlay && isCurrentTrack;

  return (
    <div className={styles.musicCard + " mobile"}>
      <div className={styles.musicCard__image}>
        <Image fill objectFit="cover" src={image || ImagePlaceholder} alt={name + " " + author} />
      </div>
      <div className={styles.musicCard__info}>
        <div className={styles.musicCard__name}>{name}</div>
        <div className={styles.musicCard__author}>{author}</div>
      </div>
      <button onClick={onToggleState} className={styles.musicCard__trackState}>
        {isPlaying ? <PauseIcon className={"icon"} /> : <PlayIcon className={"icon"} />}
      </button>
    </div>
  );
};

export default MusicCardMobile;
