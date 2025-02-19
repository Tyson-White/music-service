"use client";

import styles from "./styles/player-bar.module.scss";
import { useState } from "react";

import ArrowIcon from "@/components/ui/svg/arrow-icon";
import Timeline from "@/components/reusable/timeline";
import TrackControl from "./track-control";

const PlayerBarMobile = () => {
  const [barIsShowing, setBarIsShowing] = useState(true);

  return (
    <div className={styles.playerBar + ` ${barIsShowing ? "" : styles.playerBar_hidden}`}>
      <button
        onClick={() => setBarIsShowing((prev) => !prev)}
        className={styles.playerBar__hideButton + ` ${!barIsShowing ? styles.playerBar__hideButton_rotate : ""}`}
      >
        <ArrowIcon className="icon" />
      </button>
      <Timeline
        className={styles.playerBar__timeline}
        progressBarClassName={styles.playerBar__progressBar}
        wrapperClassName={styles.playerBar__timelineWrapper}
      />
      <TrackControl />
    </div>
  );
};

export default PlayerBarMobile;
