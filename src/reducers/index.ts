import {
  IMoviesActions,
  IMoviesActionTypes,
  IMoviesContextInitialState,
} from '@/interfaces';

export const reducer = (
  state: IMoviesContextInitialState,
  action: IMoviesActions
) => {
  switch (action.type) {
    case IMoviesActionTypes.SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case IMoviesActionTypes.SET_CLEANED_MOVIES:
      return {
        ...state,
        cleanedMovies: action.payload,
      };
    default:
      throw new Error(`No case for type found in moviesReducer`);
  }
};
