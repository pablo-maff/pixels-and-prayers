import { Autocomplete } from '@components/Autocomplete/Autocomplete';
import { Button } from '@components/Button/Button';
import { Counter } from '@components/Counter/Counter';
import { Input } from '@components/Input/Input';
import { useState } from 'react';

const autoCompleteItems = ['Tadej Pogačar', 'Jonas Vingegaard', 'Remco Evenepoel', 'Primož Roglič'];

function App() {
  const [value, setValue] = useState('');
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="my-input">Test input</label>
        <Input id="my-input" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <Counter />
      <Autocomplete items={autoCompleteItems} onSelect={() => {}} label="Choose your cyclist" />
      <Button>
        <span>Click MEEE</span>
      </Button>
    </>
  );
}

export default App;
