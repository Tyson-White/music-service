import { create } from "zustand";
import { EnumPlaylists, IPlaylistsStore } from "./playlists-store.types";

const usePlaylistsStore = create<IPlaylistsStore>((set) => ({
  playlists: {
    main: [],
  },

  setPlaylistData: (tracks, playlistKey: EnumPlaylists) =>
    set((prev) => ({ playlists: { ...prev.playlists, [playlistKey]: tracks } })),
}));

export default usePlaylistsStore;
