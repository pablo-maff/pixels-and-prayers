export const ERROR_MESSAGE = 'All items must be a string';

export function searchString(items: string[], searchValue: string) {
  if (!items.every((item) => typeof item === 'string')) {
    throw new Error(ERROR_MESSAGE);
  }

  const sanitizedSearchValue = searchValue.trim().toLowerCase();

  if (!sanitizedSearchValue) {
    return [];
  }

  const match = items.filter((item) => item.toLowerCase().includes(sanitizedSearchValue));

  return match;
}
