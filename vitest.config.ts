import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'unit',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.stories.*',
        '**/.storybook/**',
        'src/main.tsx',
      ],
    },
  },
});
