export const formatTime = (time: number): string => {
  time = Number(time.toFixed(2));

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
