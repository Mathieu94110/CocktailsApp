import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useDebounce } from '../../../../helpers/useDebounce';
import styles from './SearchInput.module.scss';

function SearchInput({
  setFilter,
  currentFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
  currentFilter: string;
}) {
  const [debouncedOutput, setDebouncedOutput] = useState('');

  async function onChangeDebouncedEvent(text: string) {
    setDebouncedOutput(text);
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
}

export default SearchInput;