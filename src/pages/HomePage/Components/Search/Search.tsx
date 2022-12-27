import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './Search.module.scss';

function Search({
  setFilter,
  currentFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
  currentFilter: string;
}) {
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const filter = e.currentTarget.value;
    setFilter(filter.trim().toLowerCase());
  }

  return (
    <div
      className={`d-flex flex-row justify-content-center align-item-center my-10 ${styles.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input
        onInput={handleInput}
        className="flex-fill"
        type="text"
        placeholder={currentFilter}
      />
    </div>
  );
}

export default Search;
