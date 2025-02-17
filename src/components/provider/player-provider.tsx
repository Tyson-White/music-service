"use client";

import { IPlayerContextValue, ITrackData } from "@/shared/types/player-context.types";
import { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import data from "@/../public/static/music/music.json";

export const PlayerContext = createContext<IPlayerContextValue | null>(null);

const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const audioFile = useRef(new Audio()).current;
  const audioContext = useRef(new AudioContext()).current;
  const analyser = useRef<AnalyserNode | null>(null);

  const [trackList, setTrackList] = useState<ITrackData[]>([]);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [trackData, setTrackData] = useState<ITrackData | null>(null);

  const togglePlay = () => {
    if (!audioFile.src) return;

    if (audioFile.paused) {
      audioFile.play();
      setIsPlay(true);
    } else {
      audioFile.pause();
      setIsPlay(false);
    }
  };

  useEffect(() => {
    if (trackData) {
      audioFile.src = trackData.path;
      analyser.current = audioContext.createAnalyser();
      togglePlay();
    }
  }, [audioFile, trackData]);

  useEffect(() => {
    setTrackList(data.music);
  }, []);

  return (
    <PlayerContext.Provider
      value={{ trackList, analyser: analyser.current, file: audioFile, isPlay, togglePlay, trackData, setTrackData }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
