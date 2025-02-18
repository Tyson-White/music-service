import { FC, InputHTMLAttributes } from "react";

import styles from "./slider.module.scss";

// interface ISliderProps {
//   min: number;
//   max: number;
//   value: number;
// }

const Slider: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  min = 0,
  max = 100,
  value,
  onChange,
  onMouseDown,
  onMouseUp,
  className,
}) => {
  return (
    <div className={styles.rangerWrapper}>
      <div className={styles.progressBar} style={{ width: (100 / Number(max)) * Number(value) + "%" }} />
      <input
        value={value}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onChange={onChange}
        className={styles.range + " " + className}
        min={min}
        max={max}
        type="range"
      />
    </div>
  );
};

export default Slider;
