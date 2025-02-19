import { useEffect, useState } from "react";
import styles from "./styles/sound-control.module.scss";
import SoundOnIcon from "@/components/ui/svg/sound-on-icon";
import SoundOffIcon from "@/components/ui/svg/sound-off-icon";
import Slider from "@/components/ui/slider";
import { useDebounce } from "@/shared/hooks/useDebounce";
import usePlayerStore from "@/shared/store/player-store";
import { LocalStorageKeys } from "@/shared/types/localstorage.enums";

const SoundControl = () => {
  const { audio } = usePlayerStore();
  const [isDidMount, setIsDidMount] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [controlShowing, setControlShowing] = useState<boolean>(false);
  const { debounceValue: controlShowingDebounced } = useDebounce<boolean>(controlShowing, 300);

  const toggleSound = () => {
    if (audio) {
      if (soundVolume > 0) {
        setSoundVolume(0);
      } else {
        setSoundVolume(0.5);
      }
    }
  };

  useEffect(() => {
    if (!audio || !isDidMount) return;
    audio.volume = soundVolume;
    localStorage.setItem(LocalStorageKeys.VOLUME, soundVolume.toString());
  }, [soundVolume]);

  useEffect(() => {
    const volume = Number(localStorage.getItem(LocalStorageKeys.VOLUME));
    setSoundVolume(volume);
    setIsDidMount(true);
  }, []);

  return (
    <div
      onMouseEnter={() => setControlShowing(true)}
      onMouseLeave={() => setControlShowing(false)}
      className={styles.soundControl}
    >
      <button onClick={toggleSound} data-state={soundVolume === 0} className={styles.soundToggler}>
        {soundVolume > 0 ? (
          <SoundOnIcon className={"icon " + styles.soundToggler__icon} />
        ) : (
          <SoundOffIcon className={"icon " + styles.soundToggler__icon} />
        )}
      </button>

      <div
        className={styles.soundControl__range + ` ${controlShowingDebounced ? styles.soundControl__range_show : ""}`}
      >
        <div className={styles.soundControl__value}>
          <span>Volume: </span>
          <span>{(soundVolume * 100).toFixed(0)}%</span>
        </div>

        <Slider
          className={styles.soundControl__input}
          min={0}
          max={100}
          value={soundVolume * 100}
          onChange={(e) => setSoundVolume(Number(e.target.value) / 100)}
        />
      </div>
    </div>
  );
};

export default SoundControl;
