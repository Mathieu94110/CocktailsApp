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
  const [debouncedOutput, setDebouncedOutput] = useState('');

  async function onChangeDebouncedEvent(text: string) {
    setDebouncedOutput(text.trim());
  }

  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);

  useEffect(() => {
    if (debouncedOutput) setFilter(debouncedOutput);
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
      />
    </div>
  );
};

