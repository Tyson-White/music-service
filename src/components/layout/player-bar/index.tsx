"use client";

import styles from "./styles/player-bar.module.scss";
import { useState } from "react";

import ArrowIcon from "@/components/ui/svg/arrow-icon";
import TrackInformation from "./track-information";
import TimelimeControl from "./timeline-control";
import SoundControl from "./sound-control";
import useDeviceByResolution from "@/shared/hooks/useDeviceByResolution";
import cn from "@/shared/lib/classNames";

const PlayerBar = () => {
  const [barIsShowing, setBarIsShowing] = useState(true);
  const device = useDeviceByResolution();

  // if (!window || window.screen.height < 851) return;

  if (device === "mobile") return;
  return (
    <div className={cn(styles.playerBar, ` ${barIsShowing ? "" : styles.playerBar_hidden}`, "desktop")}>
      <button
        onClick={() => setBarIsShowing((prev) => !prev)}
        className={cn(styles.playerBar__hideButton, `${!barIsShowing ? styles.playerBar__hideButton_rotate : ""}`)}
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
