import { Button } from '@components/Button/Button';
import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  upperLimit?: number;
}

export function Counter({ initialValue = 0, upperLimit }: CounterProps) {
  const [count, setCount] = useState(initialValue);

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
        <Button onClick={() => setCount((prevCount) => prevCount - 1)} aria-label="decrement">
          <span>-</span>
        </Button>
      </div>
    </div>
  );
}
