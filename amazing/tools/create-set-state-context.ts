import { createContext, Dispatch, SetStateAction } from 'react';

export function createSetStateContext<T>(defaultState: T) {
  return createContext<[T, Dispatch<SetStateAction<T>>]>([
    defaultState,
    () => {},
  ]);
}
