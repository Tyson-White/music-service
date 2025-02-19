import { ChangeEvent } from "react";
import usePlayerStore from "../store/player-store";

const useTimelineControl = () => {
  const storeContext = usePlayerStore();
  const {
    audio,
    trackTimerValue,
    timerId,
    trackData,
    usingTrackList: trackList,
    setTrackTimerValue,
    setTimelineIsChanging,
    setTimerId,
    setTrackData,
  } = storeContext;

  const startMonitoringTime = () => {
    if (audio) {
      setTimerId(
        setInterval(() => {
          setTrackTimerValue(audio.currentTime || 0);
        }, 1)
      );
    }
  };

  const stopMonitoringTime = () => {
    if (timerId) {
      clearInterval(timerId);
    }
  };

  const changeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackTimerValue(Number(e.target.value));
  };

  const onEndChangeTime = () => {
    if (audio) {
      audio.currentTime = trackTimerValue;
    }

    setTimelineIsChanging(false);
  };

  const currentIndexInTrackList =
    !trackData || !trackList ? -1 : trackList.findIndex((track) => track.id === trackData.id);

  const handlePrevPress = () => {
    if (!trackList) return;

    if (currentIndexInTrackList > 0) {
      setTrackData(trackList[currentIndexInTrackList - 1]);
    }
  };

  const handleNextPress = () => {
    if (!trackList) return;

    if (currentIndexInTrackList < trackList.length - 1) {
      setTrackData(trackList[currentIndexInTrackList + 1]);
    }
  };

  return {
    ...storeContext,
    handleNextPress,
    handlePrevPress,
    onEndChangeTime,
    changeTime,
    stopMonitoringTime,
    startMonitoringTime,
  };
};

export default useTimelineControl;
