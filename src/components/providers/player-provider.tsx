"use client";

import usePlayerStore from "@/shared/store/player-store";
import { FC, PropsWithChildren, useEffect } from "react";
import tracks from "@/../public/static/music/music.json";

const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUsingTrackList, setAudio } = usePlayerStore();

  useEffect(() => {
    setUsingTrackList(tracks.music);

    setAudio(new Audio());
  }, []);
  return children;
};

export default PlayerProvider;
