import { ITrackData } from "../types/player-context.types";

export const filterTrackList = (list: ITrackData[] | undefined, filterByValue: string): ITrackData[] => {
  if (!list || filterByValue.length === 0) return [];

  const value = filterByValue.toLowerCase();

  const filtred = list.filter((item) => {
    const artist = item.author.toLowerCase();
    const name = item.name.toLowerCase();

    return artist.includes(value) || name.includes(value);
  });

  return filtred;
};
