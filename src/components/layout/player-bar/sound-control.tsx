import { useContext, useEffect, useState } from "react";
import styles from "./styles/sound-control.module.scss";
import SoundOnIcon from "@/components/ui/svg/sound-on-icon";
import SoundOffIcon from "@/components/ui/svg/sound-off-icon";
import { PlayerContext } from "@/components/providers/player-provider";
import Slider from "@/components/ui/slider";
import { useDebounce } from "@/shared/hooks/useDebounce";

const SoundControl = () => {
  const playerContext = useContext(PlayerContext);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [controlShowing, setControlShowing] = useState<boolean>(false);
  const { debounceValue: controlShowingDebounced } = useDebounce<boolean>(controlShowing, 300);

  const toggleSound = () => {
    if (playerContext?.file) {
      if (soundVolume > 0) {
        setSoundVolume(0);
      } else {
        setSoundVolume(0.5);
      }
    }
  };

  useEffect(() => {
    if (!playerContext) return;

    playerContext.file.volume = soundVolume;
  }, [soundVolume]);

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
