import React from 'react';
import styles from './Paginate.module.scss';

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  currentPageNumber,
}: {
  postsPerPage: number;
  totalPosts: number;
  paginate: (x: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPageNumber: number;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        <li onClick={previousPage} className={styles.paginateItems}>
          Prev
        </li>
        {pageNumbers.map((number: number, index: number) => (
          <li
            key={index}
            onClick={() => paginate(number)}
            className={
              `${styles.paginateItems} ` +
              (number === currentPageNumber ? `${styles.active}` : '')
            }
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className={styles.paginateItems}>
          Next
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
