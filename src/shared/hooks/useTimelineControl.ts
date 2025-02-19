import { ChangeEvent } from "react";
import usePlayerStore from "../store/player-store";

const useTimelineControl = () => {
  const {
    audio,
    isPlay,
    trackTimerValue,
    timerId,
    trackData,
    timelineIsChanging,
    usingTrackList: trackList,
    setTrackTimerValue,
    setTimelineIsChanging,
    setTimerId,
    setTrackData,
    togglePlay,
  } = usePlayerStore();

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
    audio,
    isPlay,
    timelineIsChanging,
    trackTimerValue,
    trackData,
    setTimelineIsChanging,
    handleNextPress,
    handlePrevPress,
    onEndChangeTime,
    changeTime,
    stopMonitoringTime,
    startMonitoringTime,
    togglePlay,
    setTrackData,
  };
};

export default useTimelineControl;
