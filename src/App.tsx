import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@components/Button/Button';
import { Counter } from '@components/Counter/Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter />
      <Button>
        <span>Click MEEE</span>
      </Button>
    </>
  );
}

export default App;
