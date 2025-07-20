import { Button } from '@components/Button/Button';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div role="status" aria-label="counter">
        <span>{count}</span>
      </div>
      <div>
        <Button onClick={() => setCount((prevCount) => prevCount + 1)} aria-label="increment">
          <span>+</span>
        </Button>
      </div>
    </div>
  );
}
