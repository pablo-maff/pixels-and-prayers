import { useState } from 'react';
import style from './Slider.module.scss';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  value?: number;
}

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  onChange,
  value: controlledValue,
}: SliderProps) {
  
  const [internalValue, setInternalValue] = useState(min);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const leftGrow = value - min;
  const rightGrow = max - value;

  return (
    <div className={style.custom_slider}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={style.slider_input}
      />
      <div className={style.track}>
        <div className={style.filled} style={{ flexGrow: leftGrow }} />
        <div className={style.remaining} style={{ flexGrow: rightGrow }} />
      </div>
       <p style={{margin: "0 auto"}}>{value}</p>
    </div>
  );
}
