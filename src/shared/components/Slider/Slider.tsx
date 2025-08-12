import style from './Slider.module.scss';
interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export default function Slider({ min, max, step, value, onChange }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
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
        className={style.slider_input}
      />
      <div className={style.track}>
        <div className={style.filled} style={{ width: `${percentage}%` }} />
      </div>
      <p style={{ margin: '0 auto' }}>{value}</p>
    </div>
  );
}
