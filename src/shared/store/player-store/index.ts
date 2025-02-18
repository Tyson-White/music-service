import { create } from "zustand";
import { IPlayerStore } from "./player-store.types";

const usePlayerStore = create<IPlayerStore>((set, get) => ({
  audio: new Audio(),
  isPlay: false,
  usingTrackList: [],
  trackData: null,
  trackTimerValue: 0,

  setTrackTimerValue: (value) => {
    const isEnded = get().audio.ended;
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
