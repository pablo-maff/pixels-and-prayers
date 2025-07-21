import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Ensure each test runs in a clean DOM
afterEach(() => {
  cleanup();
});
