import { Button } from '@components/Button/Button';
import { useRef, useState } from 'react';
import styles from './Counter.module.scss';

interface CounterProps {
  initialValue?: number;
  upperLimit?: number;
  lowerLimit?: number;
}

export function Counter({ initialValue = 0, upperLimit, lowerLimit }: CounterProps) {
  const [count, setCount] = useState(initialValue);
  const initialValueRef = useRef(initialValue);

  return (
    <div className={styles.counter}>
      <output className={styles.output} aria-label="counter">
        {count}
      </output>

      <div className={styles.controls}>
        <Button
          aria-label="decrement"
          onClick={() => setCount((prevCount) => prevCount - 1)}
          disabled={Boolean(count === lowerLimit)}
        >
          <span aria-hidden="true">-</span>
        </Button>

        <Button
          aria-label="increment"
          onClick={() => setCount((prevCount) => prevCount + 1)}
          disabled={Boolean(count === upperLimit)}
        >
          <span aria-hidden="true">+</span>
        </Button>
      </div>

      <div className={styles.reset}>
        <Button
          aria-label="reset"
          onClick={() => setCount(initialValueRef.current)}
          disabled={Boolean(count === initialValueRef.current)}
        >
          <span>Reset</span>
        </Button>
      </div>
    </div>
  );
}
