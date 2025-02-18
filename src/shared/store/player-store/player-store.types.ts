import { ITrackData } from "@/shared/types/player-context.types";

export interface IPlayerStore {
  usingTrackList: ITrackData[];
  isPlay: boolean;
  trackData: ITrackData | null;
  setTrackData: (track: ITrackData) => void;
  audio: HTMLAudioElement;
  trackTimerValue: number;

  setUsingTrackList: (value: ITrackData[]) => void;
  setTrackTimerValue: (value: number) => void;
  togglePlay: () => void;
}
