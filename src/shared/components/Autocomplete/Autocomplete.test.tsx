/*
Feature: Autocomplete search

  As a user
  I want to type into a search field
  So that I can select an item from a matching dropdown list

  Background:
    Given a list of items is available to the component

  Scenario: Results appear after typing stops
    When I type into the input field
    And a short delay has passed
    Then a dropdown should appear
    And it should show a list of relevant results

  Scenario: Selecting an item with the mouse
    Given the dropdown is open with results
    When I click on an item
    Then the item is selected
    And the dropdown closes

  Scenario: Navigating results with the keyboard
    Given the dropdown is open with results
    When I press the down arrow key
    Then the next item is highlighted

    When I press the up arrow key
    Then the previous item is highlighted

  Scenario: Selecting an item with Enter
    Given an item is highlighted
    When I press the Enter key
    Then the item is selected
    And the dropdown closes

  Scenario: Pressing Escape closes the dropdown
    Given the dropdown is open
    When I press the Escape key
    Then the dropdown closes
    And no item is selected

  Scenario: Clicking outside closes the dropdown
    Given the dropdown is open
    When I click outside the component
    Then the dropdown closes

  Scenario: No matching results
    Given the input is not empty
    And no items are available
    Then the dropdown shows a message indicating no results were found

  Scenario: Search is in progress
    Given the component is loading
    Then a loading indicator is displayed in place of the results

  Scenario: Enter key does nothing when no item is highlighted
    Given the dropdown is open
    And no item is highlighted
    When I press Enter
    Then no item is selected

  Scenario: Hovering over an item highlights it
    When I hover over an item in the dropdown
    Then it becomes the highlighted item
*/

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Autocomplete } from './Autocomplete';
import userEvent from '@testing-library/user-event';

describe('Autocomplete', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Results appear after typing stops', () => {
    it('shows the dropdown after a short delay', async () => {
      const { getByRole } = render(<Autocomplete />);

      const input = getByRole('textbox', { name: 'search' });

      await user.type(input, 'abc');

      const result = getByRole('option');

      expect(result).toBeVisible();
    });
    it.skip('shows a list of relevant results', () => {});
  });

  describe('Selecting an item with the mouse', () => {
    it.skip('selects the item when clicked', () => {});
    it.skip('closes the dropdown after selection', () => {});
  });

  describe('Navigating results with the keyboard', () => {
    it.skip('highlights the next item with down arrow', () => {});
    it.skip('highlights the previous item with up arrow', () => {});
  });

  describe('Selecting an item with Enter', () => {
    it.skip('selects the highlighted item with Enter', () => {});
    it.skip('closes the dropdown after selection', () => {});
  });

  describe('Pressing Escape closes the dropdown', () => {
    it.skip('closes the dropdown with Escape key', () => {});
    it.skip('does not select any item', () => {});
  });

  describe('Clicking outside closes the dropdown', () => {
    it.skip('closes the dropdown when clicking outside', () => {});
  });

  describe('No matching results', () => {
    it.skip('shows an empty state message when there are no matches', () => {});
  });

  describe('Search is in progress', () => {
    it.skip('displays a loading indicator when loading', () => {});
  });

  describe('Enter key does nothing when no item is highlighted', () => {
    it.skip('does not select any item when Enter is pressed with no highlight', () => {});
  });

  describe('Hovering over an item highlights it', () => {
    it.skip('highlights item on mouse hover', () => {});
  });
});
