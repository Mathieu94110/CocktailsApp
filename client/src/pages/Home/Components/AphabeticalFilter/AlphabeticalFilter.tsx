import styles from './AlphabeticalFilter.module.scss';

const Alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const AlphabeticalFilter = ({
  setLetter,
}: {
  setLetter: (letter: string) => void;
}) => {
  return (
    <div className={styles.alphabeticalFilter}>
      <ul>
        {Alphabet.map((letter: string, index: number) => (
          <li key={index} onClick={() => setLetter(letter)}>
            {letter}
          </li>
        ))}
      </ul>
    </div>
  );
};

