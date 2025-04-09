import { useEffect, useRef, useState } from 'react';
import styles from './DropdownFilters.module.scss';
import { CocktailsFilters, CocktailsFiltersKey } from 'interfaces/filters.interface';

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
        {getDisplay()}
        <div>
          <i className={'fa-solid fa-magnyfing-glass mr-5 text-white'}></i>
        </div>
      </div>
      {showMenu && (
        <div className={styles.dropdownMenu}>
          {isSearchable && (
            <div className={styles.searchBox}>
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          <ul className={styles.dropdownMenuList}>
            {getOptions().map((option: CocktailsFiltersKey, index: number) => (
              <li className={styles.dropdownMenuListItem} key={index} onClick={() => toggleOption(option)}>
                <input
                  onChange={() => toggleOption(option)}
                  type="checkbox"
                  checked={isSelected(option)}
                />
                <label>{getCocktailFilter(option)}</label>
              </li>
            ))}
          </ul>
        </div>
      )
      }
    </div >
  );
};
