import { ITrackData } from "@/shared/types/player-context.types";
import styles from "./styles/dropdown-item.module.scss";
import { FC } from "react";
import Image from "next/image";

interface IDropdownItemProps extends ITrackData {
  className?: string;
}

const DropdownItem: FC<IDropdownItemProps> = (props) => {
  const { image, name, author, duration } = props;

  return (
    <div className={styles.trackItem}>
      <div className={styles.trackItem__image}>
        <Image src={image} fill objectFit="cover" alt={name + " " + author} />
      </div>
      <div className={styles.trackItem__info}>
        <p className={styles.trackItem__name}>{name}</p>
        <p className={styles.trackItem__author}>{author}</p>
      </div>
      <div className={styles.trackItem__duration}>{duration}</div>
    </div>
  );
};

export default DropdownItem;
