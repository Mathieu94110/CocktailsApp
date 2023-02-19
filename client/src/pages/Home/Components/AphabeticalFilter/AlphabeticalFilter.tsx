import styles from './AlphabeticalFilter.module.scss';

const Alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AlphabeticalFilter = ({
  setLetter,
}: {
  setLetter: (letter: string) => void;
}) => {
  return (
    <div className={styles.alphabeticalFilter}>
      <ul>
        {Alphabet.map((letter: string, index: number) => (
          <li
            className={styles.alphabeticalFilterInput}
            key={index}
            onClick={() => setLetter(letter)}
          >
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
};
