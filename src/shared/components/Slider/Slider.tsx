import { useState } from 'react';
import style from './Slider.module.scss';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: SliderProps) {
  const [value, setValue] = useState(min);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={style.custom_slider}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={style.slider_thumb}
      />
      <div className={style.slider_track}>
        <div className={style.slider_filled} style={{ width: `${percentage}%` }} />
      </div>
      <div className={style.slider_value}>{value}</div>
    </div>
  );
}
