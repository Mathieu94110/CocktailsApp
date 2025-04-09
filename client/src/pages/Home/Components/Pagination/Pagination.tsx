import styles from './Pagination.module.scss';

export const Pagination = ({
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
        {currentPageNumber > 1 && (
          <li onClick={previousPage} className={styles.paginateItems}>
            Précédent
          </li>
        )}
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
        {currentPageNumber < pageNumbers.length && (
          <li onClick={nextPage} className={styles.paginateItems}>
            Suivant
          </li>
        )}
      </ul>
    </div>
  );
};