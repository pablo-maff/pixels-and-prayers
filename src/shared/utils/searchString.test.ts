import { describe, it, expect } from 'vitest';
import { ERROR_MESSAGE, stringSearch } from './searchString';

// * Requirements:
// * 1. Return all items that include the term as a substring.
// * 2. Not be affected by leading or trailing whitespace in the search term.
// * 3. Perform case-insensitive matching.
// * 4. Return an empty array for empty or whitespace-only search term.
// * 5. Throw an error if any item is not a string.
// * 6. Not mutate the original array (pure function).

const items = ['Alpha', 'beta', 'Gamma', 'alphabet'];

describe('stringSearch', () => {
  it('should return an items that match the search term', () => {
    const result = stringSearch(items, 'beta');
    expect(result).toEqual(['beta'])
  });

  it('should return all items that include the term as a substring', () => {
    const result = stringSearch(items, 'be');
    expect(result).toEqual(['beta', 'alphabet'])
  });

  it('should not be affected by leading or trailing whitespace in the search term', () => {
    const result = stringSearch(items, ' Ga ')
    expect(result).toEqual(['Gamma'])
  });

  it('should perform case-insensitive matching', () => {
    const result = stringSearch(items, 'gamma');
    expect(result).toEqual(['Gamma'])
  });

  it('should return an empty array for empty or whitespace-only search term', () => {
    const result = stringSearch(items, '  ')
    expect(result).toEqual([])
  });

  it('should throw an error if any item is not a string', () => {
    // @ts-expect-error Testing runtime error for non-string
    expect(() => stringSearch([2, 'alpha'], 'al')).toThrowError(ERROR_MESSAGE)
  });

  it('should not mutate the original array', () => {
    const result = stringSearch(items, 'a')
    expect(result).not.toBe(items)
  });
});
