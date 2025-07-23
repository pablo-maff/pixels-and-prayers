import { describe, it, expect } from 'vitest';
import { ERROR_MESSAGE, searchString } from './searchString';

// * Requirements:
// * 1. Return all items that include the term as a substring.
// * 2. Not be affected by leading or trailing whitespace in the search term.
// * 3. Perform case-insensitive matching.
// * 4. Return an empty array for empty or whitespace-only search term.
// * 5. Throw an error if any item is not a string.
// * 6. Not mutate the original array (pure function).

const items = ['Alpha', 'beta', 'Gamma', 'alphabet'];

describe('searchString', () => {
  it('should return an items that match the search term', () => {
    const result = searchString(items, 'beta');
    expect(result).toEqual(['beta']);
  });

  it('should return all items that include the term as a substring', () => {
    const result = searchString(items, 'be');
    expect(result).toEqual(['beta', 'alphabet']);
  });

  it('should not be affected by leading or trailing whitespace in the search term', () => {
    const result = searchString(items, ' Ga ');
    expect(result).toEqual(['Gamma']);
  });

  it('should perform case-insensitive matching', () => {
    const result = searchString(items, 'gamma');
    expect(result).toEqual(['Gamma']);
  });

  it('should return an empty array for empty or whitespace-only search term', () => {
    const result = searchString(items, '  ');
    expect(result).toEqual([]);
  });

  it('should throw an error if any item is not a string', () => {
    // @ts-expect-error Testing runtime error for non-string
    expect(() => searchString([2, 'alpha'], 'al')).toThrowError(ERROR_MESSAGE);
  });

  it('should not mutate the original array', () => {
    const result = searchString(items, 'a');
    expect(result).not.toBe(items);
  });
});
