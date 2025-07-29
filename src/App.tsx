import { Autocomplete } from '@components/Autocomplete/Autocomplete';
import { Button } from '@components/Button/Button';
import ComponentFrame from '@components/ComponentFrame/Componentframe';
import { Counter } from '@components/Counter/Counter';
import { Input } from '@components/Input/Input';
import { useState } from 'react';

const autoCompleteItems = ['Tadej Pogačar', 'Jonas Vingegaard', 'Remco Evenepoel', 'Primož Roglič'];

function App() {
  const [value, setValue] = useState('');
  return (
    <div className="wrapper">
      <ComponentFrame title="INPUTS">
        <div>
          <label htmlFor="my-input">Test input</label>
          <Input id="my-input" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <Autocomplete items={autoCompleteItems} onSelect={() => {}} label="Choose your cyclist" />
      </ComponentFrame>

      <ComponentFrame title="COUNTER">
        <Counter />
      </ComponentFrame>

      <ComponentFrame title="BUTTON">
        <Button>
          <span>Click MEEE</span>
        </Button>
      </ComponentFrame>
    </div>
  );
}

export default App;
