import { useState, useEffect } from 'react';
import { useDebounce } from 'hooks';
import styles from './SearchInput.module.scss';

export const SearchInput = ({
  setFilter,
  currentFilter,
}: {
  setFilter: (text: string) => void;
  currentFilter: string;
}) => {
  // DebouncedOutput is initialized to null in order to prevent searchInputValue from parent to be empty after first loading
  const [debouncedOutput, setDebouncedOutput] = useState<string | null>(null);

  const onChangeDebouncedEvent = async (text: string): Promise<void> => {
    setDebouncedOutput(text.trim());
  };
  // Here onChangeDebounced is used to authorize api call after 800ms delay between each new entries
  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);

  useEffect(() => {
    if (debouncedOutput) setFilter(debouncedOutput);
  }, [debouncedOutput]);

  return (
    <div
      className={styles.searchInputContainer}
    >
      <i className="fa-solid fa-magnifying-glass mr-15 text-white"></i>
      <input
        onChange={(e) => onChangeDebounced(e.target.value)}
        className={styles.searchInput}
        type="search"
        placeholder={currentFilter}
        aria-label="search-input"
      />
    </div>
  );
};
