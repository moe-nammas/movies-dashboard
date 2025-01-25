import { MOVIES_INITIAL_STATE } from '@/constants';
import { IMoviesReducer } from '@/interfaces';
import { reducer } from '@/reducers';
import { createContext, ReactElement, useContext, useReducer } from 'react';

const moviesContext = createContext<IMoviesReducer>({
  state: MOVIES_INITIAL_STATE,
  dispatch: () => {},
});

const MoviesProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [state, dispatch] = useReducer(reducer, MOVIES_INITIAL_STATE);

  return (
    <moviesContext.Provider value={{ state, dispatch }}>
      {children}
    </moviesContext.Provider>
  );
};

const useMoviesContext = () => {
  return useContext(moviesContext);
};

export { useMoviesContext, MoviesProvider };
