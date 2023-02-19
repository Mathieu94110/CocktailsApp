import { render, fireEvent, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

const setup = () => {
  const mockOnChangeHandler = jest.fn();
  render(
    <SearchInput
      setFilter={() => mockOnChangeHandler}
      currentFilter="margarita"
    />
  );
  const searchInput = screen.getByLabelText('search-input') as HTMLInputElement;
  return {
    searchInput,
  };
};

test('It should display the correct searched value', () => {
  const { searchInput } = setup();
  fireEvent.change(searchInput, { target: { value: 'lipton ice' } });
  expect(searchInput.value).toBe('lipton ice');
  fireEvent.change(searchInput, { target: { value: '' } });
  expect(searchInput.value).toBe('');
});

test('It should display the correct placeholder text', () => {
  const { searchInput } = setup();
  expect(searchInput).toHaveAttribute('placeholder', 'margarita');
});


