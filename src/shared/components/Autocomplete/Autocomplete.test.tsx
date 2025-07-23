/*
Feature: Autocomplete rendering and interaction

  As a user
  I want to see and interact with a list of selectable results
  So that I can choose one efficiently

  Background:
    Given a list of items is provided to the component

  Scenario: Displaying the list
    When the input is focused
    And items are provided
    Then a dropdown appears with those items

  Scenario: Dropdown is hidden when input is not focused
    Given items are available
    And the input is not focused
    Then the dropdown should not be visible

  Scenario: Selecting an item with the mouse
    Given the dropdown is open
    When I click on an item
    Then the item is selected
    And the dropdown closes

  Scenario: Navigating items with the keyboard
    Given the dropdown is open
    When I press the down arrow key
    Then the next item is highlighted

    When I press the up arrow key
    Then the previous item is highlighted

  Scenario: Selecting an item with Enter
    Given an item is highlighted
    When I press Enter
    Then the item is selected
    And the dropdown closes

  Scenario: Pressing Escape closes the dropdown
    Given the dropdown is open
    When I press Escape
    Then the dropdown closes

  Scenario: Clicking outside closes the dropdown
    Given the dropdown is open
    When I click outside the component
    Then the dropdown closes

  Scenario: Highlight item on hover
    When I hover over a list item
    Then it becomes the highlighted item
*/

import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Autocomplete } from './Autocomplete';
import userEvent from '@testing-library/user-event';

describe('Autocomplete', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let handleOnSearch: ReturnType<typeof vi.fn>;

  const testItems = [
    'Tadej Pogačar',
    'Jonas Vingegaard',
    'Remco Evenepoel',
    'Primož Roglič',
    'Wout van Aert',
    'Mathieu van der Poel',
    'Mads Pedersen',
  ];

  beforeEach(() => {
    user = userEvent.setup();
    handleOnSearch = vi.fn();
  });
  describe('Displaying the list', () => {
    it('shows the dropdown when input is focused and an item is provided', async () => {
      const { getByRole } = render(
        <Autocomplete items={[testItems[0]]} onSearch={handleOnSearch} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = getByRole('option');

      expect(result).toBeVisible();
    });

    it('does not show the dropdown if not focused even if an item is available', () => {
      const { queryByRole } = render(
        <Autocomplete items={[testItems[0]]} onSearch={handleOnSearch} />,
      );

      const result = queryByRole('option');

      expect(result).toBeNull();
    });

    it('does show the dropdown if it has regained focus and an item is available', async () => {
      const { getByRole, queryByRole } = render(
        <Autocomplete items={[testItems[0]]} onSearch={handleOnSearch} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = queryByRole('option');

      expect(result).toBeVisible();

      fireEvent.focusOut(input);

      const resultAfterLostFocus = queryByRole('option');

      expect(resultAfterLostFocus).toBeNull();
    });

    it('shows the dropdown with multiple items when multiple items are provided', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSearch={handleOnSearch} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = getAllByRole('option');

      expect(result.length).toEqual(testItems.length);
    });
  });

  describe('Selecting an item with the mouse', () => {
    it.skip('selects the item when clicked', () => {});
    it.skip('closes the dropdown after selection', () => {});
  });

  describe('Navigating items with the keyboard', () => {
    it.skip('highlights the next item with down arrow', () => {});
    it.skip('highlights the previous item with up arrow', () => {});
  });

  describe('Selecting an item with Enter', () => {
    it.skip('selects the highlighted item with Enter', () => {});
    it.skip('closes the dropdown after selection', () => {});
  });

  describe('Pressing Escape closes the dropdown', () => {
    it.skip('closes the dropdown when Escape is pressed', () => {});
  });

  describe('Clicking outside closes the dropdown', () => {
    it.skip('closes the dropdown when clicking outside the component', () => {});
  });

  describe('Highlight item on hover', () => {
    it.skip('highlights the item when hovered with the mouse', () => {});
  });
});
