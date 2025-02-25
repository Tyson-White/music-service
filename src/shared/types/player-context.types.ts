import { Dispatch, SetStateAction } from "react";

export interface ITrackData {
  id: number;
  name: string;
  author: string;
  image: string;
  audio: string;
  duration: string;
  listening: number;
}

export interface IPlayerContextValue {
  isPlay: boolean;
  togglePlay: () => void;
  trackData: ITrackData | null;
  setTrackData: Dispatch<SetStateAction<ITrackData | null>>;
  file: HTMLAudioElement;
  trackList: ITrackData[];
  analyser: AnalyserNode | null;
}
