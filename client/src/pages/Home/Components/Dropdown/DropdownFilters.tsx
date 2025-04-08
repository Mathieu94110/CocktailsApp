import { useEffect, useRef, useState } from 'react';
import { CategoriesInterface } from 'interfaces';
import styles from './DropdownFilters.module.scss';
import { CocktailsFilters, CocktailsFiltersKey } from 'interfaces/filters';

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export const DropdownFilters = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
}: {
  placeHolder: string;
  options: any[];
  isMulti: boolean;
  isSearchable: boolean;
  onChange: (x: any[]) => void;
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: Event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as HTMLElement)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const removeOption = (option: CocktailsFiltersKey) => {
    return selectedValue?.filter(
      (o: CocktailsFiltersKey) => o !== option
    );
  };

  const removeTag = (e: React.MouseEvent, option: CocktailsFiltersKey) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const getCocktailFilter = (option: CocktailsFiltersKey) => CocktailsFilters[option];

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className={styles.dropdownTags} data-cy="dropdown-tags-items">
          <ul>
            {selectedValue.map((option: CocktailsFiltersKey, index: number) => (
              <li key={index} className={styles.dropdownTagItem}>
                {getCocktailFilter(option)}
                <span
                  onClick={(e) => removeTag(e, option)}
                  className={styles.dropdownTagClose}
                >
                  <i className="fa-solid fa-xmark ml-5 d-flex align-items-center"></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return selectedValue.label;
  };

  const toggleOption = (option: CocktailsFiltersKey) => {
    let newValue;
    if (isMulti) {
      if (
        selectedValue.findIndex(
          (o: CocktailsFiltersKey) => o === option
        ) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: CocktailsFiltersKey) => {
    if (isMulti) {
      return (
        selectedValue.filter(
          (o: CocktailsFiltersKey) => o === option
        ).length > 0
      );
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option;
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;

    }

    return options.filter(
      (option: CocktailsFiltersKey) =>
        option.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className={styles.dropdownContainer}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={styles.dropdownInput}
        data-cy="dropdown-container"
      >
        <div className={styles.dropdownSelectedValue}>{getDisplay()}</div>
        <div className={styles.dropdownTools}>
          <div className={styles.dropdownTool}>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.dropdownMenu}>
          {isSearchable && (
            <div className={styles.searchBox}>
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          {getOptions().map((option: CocktailsFiltersKey, index: number) => (
            <div className="my-10" key={index} onClick={() => toggleOption(option)}>
              <input
                onChange={() => toggleOption(option)}
                type="checkbox"
                checked={isSelected(option)}
              />
              <label>{getCocktailFilter(option)}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
