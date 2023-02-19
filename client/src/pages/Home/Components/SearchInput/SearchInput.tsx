import { useState, useEffect } from 'react';
import { useDebounce } from 'helpers';
import styles from './SearchInput.module.scss';

export const SearchInput = ({
  setFilter,
  currentFilter,
}: {
  setFilter: (text: string) => void;
  currentFilter: string;
}) => {
  const [debouncedOutput, setDebouncedOutput] = useState<string>('');
  
  const onChangeDebouncedEvent = async (text: string): Promise<void> => {
    setDebouncedOutput(text.trim());
  };
  // Here onChangeDebounced is used to authorize api call after 800ms delay between each new entries
  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);

  useEffect(() => {
    setFilter(debouncedOutput);
  }, [debouncedOutput]);

  return (
    <div
      className={`d-flex flex-row justify-content-center align-item-center my-10 ${styles.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input
        onChange={(e) => onChangeDebounced(e.target.value)}
        className="flex-fill"
        type="text"
        placeholder={currentFilter}
        aria-label="search-input"
      />
    </div>
  );
};
