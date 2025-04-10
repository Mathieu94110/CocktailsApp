import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'hooks';
import styles from './SearchInput.module.scss';

export const SearchInput = ({
  setFilter,
  currentFilter,
}: {
  setFilter: (text: string) => void;
  currentFilter: string;
}) => {
  const [inputValue, setInputValue] = useState(currentFilter);

  const debouncedSetFilter = useDebounce((text: string) => {
    setFilter(text);
  }, 500);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetFilter(value);
  }, [debouncedSetFilter]);

  useEffect(() => {
    setInputValue(currentFilter);
  }, [currentFilter]);

  return (
    <div className={styles.searchInputContainer}>
      <i className="fa-solid fa-magnifying-glass mr-15 text-white"></i>
      <input
        value={inputValue}
        onChange={handleChange}
        className={styles.searchInput}
        type="search"
        placeholder="Rechercher un cocktail"
        aria-label="search-input"
      />
    </div>
  );
};
