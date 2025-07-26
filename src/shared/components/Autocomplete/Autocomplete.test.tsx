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
  let handleOnSelect: ReturnType<typeof vi.fn>;

  const testItems = ['Tadej Pogačar', 'Jonas Vingegaard', 'Remco Evenepoel', 'Primož Roglič'];

  beforeEach(() => {
    user = userEvent.setup();
    handleOnSelect = vi.fn();
  });

  describe('Displaying the list', () => {
    it('when input is focused and an item is provided', async () => {
      const { getByRole } = render(
        <Autocomplete items={[testItems[0]]} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = getByRole('option');

      expect(result).toBeVisible();
    });

    it('is not possible if input is not focused even if an item is available', () => {
      const { queryByRole } = render(
        <Autocomplete items={[testItems[0]]} onSelect={handleOnSelect} />,
      );

      const result = queryByRole('option');

      expect(result).toBeNull();
    });

    it('is not possible if input is focused and there are no items available', async () => {
      const { getByRole, queryByRole } = render(
        <Autocomplete items={[]} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.click(input);

      const result = queryByRole('listbox');

      expect(result).toBeNull();
    });

    it('if it has regained focus and an item is available', async () => {
      const { getByRole, queryByRole } = render(
        <Autocomplete items={[testItems[0]]} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = queryByRole('option');

      expect(result).toBeVisible();

      fireEvent.focusOut(input);

      const resultAfterLostFocus = queryByRole('option');

      expect(resultAfterLostFocus).toBeNull();
    });

    it('with multiple items when multiple items are provided', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = getAllByRole('option');

      expect(result.length).toEqual(testItems.length);
    });

    it('when typing is resumed after closing the list with the Escape key', async () => {
      const { getByRole } = render(
        <Autocomplete items={[testItems[0]]} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{Escape}');

      await user.type(input, 'def');

      const option = getByRole('option');

      expect(option).toBeVisible();
    });
  });

  describe('Selecting an item with the mouse', () => {
    it('selects the item when clicked', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.click(options[0]);

      expect(handleOnSelect).toHaveBeenCalledExactlyOnceWith(testItems[0]);
    });
    it('closes the dropdown after selection', async () => {
      const handleOnSelect = vi.fn();

      const { getByRole, getAllByRole, queryAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.click(options[0]);

      const optionsAfterSelection = queryAllByRole('option');

      expect(optionsAfterSelection.length).toBe(0);
    });
  });

  describe('Navigating items with the keyboard', () => {
    it('highlights the first item with down arrow', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowDown}');

      expect(options[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('fills input with the first item with down arrow', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}');

      expect(input).toHaveValue(testItems[0]);
    });

    it('fills input with the nth item with down arrow', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');

      expect(input).toHaveValue(testItems[2]);
    });

    it('fills input with the highlighted item when left arrow is pressed', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{ArrowLeft}');

      expect(input).toHaveValue(testItems[0]);
    });

    it('fills input with the highlighted item when right arrow is pressed', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{ArrowRight}');

      expect(input).toHaveValue(testItems[0]);
    });

    it('only one item is highlighted at the same time', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowDown}');

      expect(options[0]).toHaveAttribute('aria-selected', 'true');
      expect(options[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('highlights the nth item with down arrow', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');

      expect(options[0]).toHaveAttribute('aria-selected', 'false');
      expect(options[1]).toHaveAttribute('aria-selected', 'false');

      expect(options[2]).toHaveAttribute('aria-selected', 'true');

      expect(options[3]).toHaveAttribute('aria-selected', 'false');
    });

    it('highlights the last item with up arrow', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowUp}');

      expect(options[3]).toHaveAttribute('aria-selected', 'true');
    });

    it('highlights the nth item with up arrow', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}');

      expect(options[0]).toHaveAttribute('aria-selected', 'false');
      expect(options[1]).toHaveAttribute('aria-selected', 'true');

      expect(options[2]).toHaveAttribute('aria-selected', 'false');

      expect(options[3]).toHaveAttribute('aria-selected', 'false');
    });

    it('fills input with the first item with up arrow', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowUp}');

      expect(input).toHaveValue(testItems[3]);
    });

    it('fills input with the nth item with up arrow', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}');

      expect(input).toHaveValue(testItems[1]);
    });

    it('after reaching the last option and pressing the down arrow highlight is removed', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');

      expect(options[0]).toHaveAttribute('aria-selected', 'false');
      expect(options[1]).toHaveAttribute('aria-selected', 'false');
      expect(options[2]).toHaveAttribute('aria-selected', 'false');
      expect(options[3]).toHaveAttribute('aria-selected', 'false');
    });

    it('after reaching the last option and pressing the down arrow twice highlight goes back to the first option', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');

      expect(options[0]).toHaveAttribute('aria-selected', 'true');
      expect(options[1]).toHaveAttribute('aria-selected', 'false');
      expect(options[2]).toHaveAttribute('aria-selected', 'false');
      expect(options[3]).toHaveAttribute('aria-selected', 'false');
    });

    it('after pressing the up arrow key on the first item highlight is removed', async () => {
      const { getByRole, getAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const options = getAllByRole('option');

      await user.keyboard('{ArrowDown}{ArrowUp}');

      expect(options[0]).toHaveAttribute('aria-selected', 'false');
      expect(options[1]).toHaveAttribute('aria-selected', 'false');
      expect(options[2]).toHaveAttribute('aria-selected', 'false');
      expect(options[3]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Selecting an item with Enter', () => {
    it('selects the highlighted item with Enter', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{Enter}');

      expect(handleOnSelect).toHaveBeenCalledExactlyOnceWith(testItems[0]);
    });
    it('closes the dropdown after selection', async () => {
      const { getByRole, queryAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{Enter}');

      const options = queryAllByRole('option');

      expect(options.length).toBe(0);
    });

    it('the selected item name fills the input', async () => {
      const { getByRole } = render(<Autocomplete items={testItems} onSelect={handleOnSelect} />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{Enter}');

      expect(input).toHaveValue(testItems[0]);
    });
  });

  describe('Pressing Escape', () => {
    it('closes the dropdown', async () => {
      const { getByRole, queryAllByRole } = render(
        <Autocomplete items={testItems} onSelect={handleOnSelect} />,
      );

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      await user.keyboard('{ArrowDown}{Escape}');

      const options = queryAllByRole('option');

      expect(options.length).toBe(0);
    });
  });
});
