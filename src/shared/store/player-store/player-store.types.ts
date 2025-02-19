import { ITrackData } from "@/shared/types/player-context.types";

export interface IPlayerStore {
  usingTrackList: ITrackData[];
  isPlay: boolean;
  trackData: ITrackData | null;
  setTrackData: (track: ITrackData) => void;
  audio: HTMLAudioElement;
  trackTimerValue: number;
  timerId: NodeJS.Timeout | null;
  timelineIsChanging: boolean;

  setTimelineIsChanging: (value: boolean) => void;
  setTimerId: (value: NodeJS.Timeout) => void;
  setUsingTrackList: (value: ITrackData[]) => void;
  setTrackTimerValue: (value: number) => void;
  togglePlay: () => void;
}
