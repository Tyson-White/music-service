import { create } from "zustand";
import { IPlayerStore } from "./player-store.types";

const usePlayerStore = create<IPlayerStore>((set, get) => ({
  audio: null,
  isPlay: false,
  usingTrackList: [],
  trackData: null,
  trackTimerValue: 0,
  timerId: null,
  timelineIsChanging: false,

  setAudio: (audio) => set({ audio }),
  setTimelineIsChanging: (value) => set({ timelineIsChanging: value }),
  setTimerId: (timer) => set({ timerId: timer }),

  setTrackTimerValue: (value) => {
    const isEnded = get().audio?.ended;
    if (isEnded) {
      const currentTrackId = get().trackData?.id;
      const trackList = get().usingTrackList;

      const findedIndexInTrackList = trackList.findIndex((track) => track.id === currentTrackId);
      if (findedIndexInTrackList === -1 || trackList.length - 1 < findedIndexInTrackList + 1) {
        set({ isPlay: false });
        return;
      }

      get().setTrackData(trackList[findedIndexInTrackList + 1]);
    }

    set({ trackTimerValue: value });
  },

  setUsingTrackList: (trackList) => set({ usingTrackList: trackList }),

  setTrackData: (track) => {
    const audio = get().audio;

    if (!audio) return;

    set({ trackData: track });
    audio.src = track.path;

    audio.play();
    set({ isPlay: true });
  },

  togglePlay: () => {
    const audio = get().audio;
    if (!audio) return;

    const isPlay = get().isPlay;

    if (isPlay) {
      audio.pause();
      set({ isPlay: false });
    } else {
      audio.play();
      set({ isPlay: true });
    }
  },
}));

export default usePlayerStore;
