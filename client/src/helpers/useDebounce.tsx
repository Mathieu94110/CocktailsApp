import { useState } from 'react';
import { Timer, SomeFunction } from '../interfaces';

export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 1000
) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer);
    setTimer(newTimer);
  }) as Func;

  return debouncedFunction;
}
