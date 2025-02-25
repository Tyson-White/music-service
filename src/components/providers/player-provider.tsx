"use client";

import usePlayerStore from "@/shared/store/player-store";
import usePlaylistsStore from "@/shared/store/playlists-store";
import { FC, PropsWithChildren, useEffect } from "react";

const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUsingTrackList, setAudio } = usePlayerStore();
  const { playlists } = usePlaylistsStore();

  useEffect(() => {
    if (playlists.main) {
      setUsingTrackList(playlists.main);
    }

    setAudio(new Audio());
  }, [playlists.main]);
  return children;
};

export default PlayerProvider;
