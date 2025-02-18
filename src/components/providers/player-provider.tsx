"use client";

import usePlayerStore from "@/shared/store/player-store";
import { FC, PropsWithChildren, useEffect } from "react";
import tracks from "@/../public/static/music/music.json";

const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const setTrackList = usePlayerStore((state) => state.setUsingTrackList);

  useEffect(() => {
    setTrackList(tracks.music);
  }, []);
  return children;
};

export default PlayerProvider;
