"use client";

import styles from "./styles/player-bar.module.scss";
import { useState } from "react";

import ArrowIcon from "@/components/ui/svg/arrow-icon";
import TrackInformation from "./track-information";
import TimelimeControl from "./timeline-control";
import SoundControl from "./sound-control";

const PlayerBar = () => {
  const [barIsShowing, setBarIsShowing] = useState(true);

  // if (!window || window.screen.height < 851) return;

  return (
    <div className={styles.playerBar + ` ${barIsShowing ? "" : styles.playerBar_hidden} desktop`}>
      <button
        onClick={() => setBarIsShowing((prev) => !prev)}
        className={styles.playerBar__hideButton + ` ${!barIsShowing ? styles.playerBar__hideButton_rotate : ""}`}
      >
        <ArrowIcon className="icon" />
      </button>

      <TrackInformation />
      <TimelimeControl />
      <div className={styles.playerBar__actions}>
        <SoundControl />
      </div>
    </div>
  );
};

export default PlayerBar;
