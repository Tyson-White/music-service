import { ITrackData } from "@/shared/types/player-context.types";

export enum EnumPlaylists {
  main = "main",
}

export interface IPlaylistsStore {
  playlists: { [key in EnumPlaylists]: ITrackData[] };
  setPlaylistData: (tracks: ITrackData[], playlistKey: EnumPlaylists) => void;
}
