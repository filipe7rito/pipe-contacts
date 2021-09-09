import * as React from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ReactNode, useContext } from 'react';
import { createSetStateContext } from '../../tools/create-set-state-context';

type ProviderType = {
  id: number;
  name: string;
};

const defaultState: ProviderType = {
  id: 0,
  name: '',
};

const ContextProvider = createSetStateContext(defaultState);

type Props = {
  children: ReactNode;
  id: number;
  name: string;
};

export function Provider(props: Props) {
  const { id, name } = props;

  const [state, setState] = useState(defaultState);

  useEffect(() => {}, []);

  const value = useMemo(() => [state, setState], [state]);

  return <ContextProvider.Provider value={[state, setState]} {...props} />;
}

export function useProvider() {
  const [state, setState] = useContext(ContextProvider);

  const { id, name } = state;

  return {
    id,
    name,
  };
}
