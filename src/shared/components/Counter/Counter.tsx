import { Button } from '@components/Button/Button';
import { useRef, useState } from 'react';

interface CounterProps {
  initialValue?: number;
  upperLimit?: number;
  lowerLimit?: number;
}

export function Counter({ initialValue = 0, upperLimit, lowerLimit }: CounterProps) {
  const [count, setCount] = useState(initialValue);
  const initialValueRef = useRef(initialValue);

  return (
    <div>
      <div role="status" aria-label="counter">
        <span>{count}</span>
      </div>
      <div>
        <Button
          aria-label="increment"
          onClick={() => setCount((prevCount) => prevCount + 1)}
          disabled={Boolean(upperLimit === 0 || upperLimit)}
        >
          <span>+</span>
        </Button>
        <Button
          aria-label="decrement"
          onClick={() => setCount((prevCount) => prevCount - 1)}
          disabled={Boolean(lowerLimit === 0 || lowerLimit)}
        >
          <span>-</span>
        </Button>
      </div>
      <div>
        <Button
          aria-label="reset"
          onClick={() => setCount(initialValueRef.current)}
          disabled={Boolean(initialValue === initialValueRef.current)}
        >
          <span>Reset</span>
        </Button>
      </div>
    </div>
  );
}
