import { ReactElement } from 'react';

export interface INavigationItem {
  icon: ReactElement;
  name: string;
  url: string;
}

export interface ITableCell<T> {
  label?: string;
  key?: string;
  dataKey: string;
  render?: (row: T, data: T[]) => ReactElement;
  formattor?: (value: string) => string;
}

export interface ITableActionButton<T> {
  icon?: ReactElement;
  label: string;
  variant?: 'success' | 'danger' | 'warning' | 'default';
  onClick: (row: T, index: number) => void;
  disabled?: (row: T, index: number) => boolean;
}

export interface IOscarLists {
  oscar_nominations_list: string[];
  oscar_winning_list: string[];
}

export interface IMovieBase {
  title: string;
  year: string | number; // Can be either as we're handling both in cleanMovieData
  genre: string[];
  country: string[];
  language: string[];
  cast: string[];
}

export interface IMovieAwards {
  imdb_rating: number;
  oscar_nominations: number;
  oscar_winning: number;
}

export interface IMovie extends IMovieBase, IMovieAwards, IOscarLists {}

export interface ICleanedMovie extends Omit<IMovie, 'year'> {
  year: number; // After cleaning, year will always be number
}

export interface IMovieStats {
  averageRating: number;
  totalOscars: number;
  nominationSuccessRate: number;
  genreDistribution: Record<string, number>;
  yearRange: {
    earliest: number;
    latest: number;
  };
}

export interface IGroupedMovies {
  [key: string]: IMovie[];
}

export interface IGenreAnalysis {
  genre: string;
  movieCount: number;
  averageRating: number;
  totalOscars: number;
}

export interface IMoviesContextInitialState {
  movies: IMovie[];
  cleanedMovies: ICleanedMovie[];
}

export interface IMoviesReducer {
  state: IMoviesContextInitialState;
  dispatch: React.Dispatch<IMoviesActions>;
}

export enum IMoviesActionTypes {
  SET_MOVIES = 'SET_MOVIES',
  SET_CLEANED_MOVIES = 'SET_CLEANED_MOVIES',
}

export type IMoviesActions =
  | {
      type: IMoviesActionTypes.SET_MOVIES;
      payload: IMovie[];
    }
  | {
      type: IMoviesActionTypes.SET_CLEANED_MOVIES;
      payload: ICleanedMovie[];
    };

export interface IOption {
  label: string;
  value: string;
}

export interface IFilter {
  type: 'select' | 'input';
  id: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options?: IOption[];
  value: string | null;
  searchType: 'textSearch' | 'include' | 'number';
}
