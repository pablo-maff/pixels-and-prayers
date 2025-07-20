// ## 🔁 2. Debounced Input Component

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

// **Build:** A `<SearchInput />`
// **Requirements:**
// - The component renders a text input where the user can type a query
// - When the user stops typing, a "search" action is triggered after a short delay
// - If the user types again before the delay is over, the previous "search" is cancelled
// - The search action receives the latest input value
// - The search is not triggered on every keystroke, only after the delay
// - No search is triggered on mount
// - All timers and effects are properly cleaned up when the component unmounts

describe('SearchInput', () => {
  let user: ReturnType<typeof userEvent.setup>;

  const userInput = 'Tadej Pogačar is the ultimate pedaling sardine';

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should allow a user to input text', async () => {
    render(<SearchInput />);

    const input = screen.getByRole('textbox', { name: 'search' });

    await user.type(input, userInput);

    expect(input).toHaveTextContent(userInput);
  });
});
