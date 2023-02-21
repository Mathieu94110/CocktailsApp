import { render, fireEvent, screen, act } from '@testing-library/react';
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
describe('SearchInput', () => {
  it('should display the correct searched value', () => {
    const { searchInput } = setup();
    fireEvent.change(searchInput, { target: { value: 'lipton ice' } });
    expect(searchInput.value).toBe('lipton ice');
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(searchInput.value).toBe('');
  });

  it('should display the correct placeholder text', () => {
    const { searchInput } = setup();
    expect(searchInput).toHaveAttribute('placeholder', 'margarita');
  });

  it('should call the setFilter props onChange', async () => {
    const { searchInput } = setup();
    const promise = Promise.resolve();
    const mockOnChangeHandler = jest.fn(() => promise);
    render(
      <SearchInput setFilter={mockOnChangeHandler} currentFilter="margarita" />
    );
    fireEvent.change(searchInput, { target: { value: 'tequila' } });
    await act(() => promise);
    expect(mockOnChangeHandler).toHaveBeenCalled();
    expect(mockOnChangeHandler).toHaveBeenCalledTimes(1);
  });
});
