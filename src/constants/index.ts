import { IMoviesContextInitialState, IOption } from '@/interfaces';

export const MOVIES_INITIAL_STATE: IMoviesContextInitialState = {
  movies: [],
  cleanedMovies: [],
};

export const COUNTRY_CODE: { [key: string]: string } = {
  USA: 'us',
  UK: 'gb',
  Japan: 'jp',
  Australia: 'au',
  'New Zealand': 'nz',
  // Add more mappings as needed
};

export const COUNTRIES_OPTIONS: IOption[] = [
  { label: 'USA', value: 'USA' },
  { label: 'UK', value: 'UK' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Australia', value: 'Australia' },
  { label: 'New Zealand', value: 'New Zealand' },
  // Add more options as needed
];

export const GENRES_OPTIONS: IOption[] = [
  { label: 'Action', value: 'Action' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Drama', value: 'Drama' },
  { label: 'Crime', value: 'Crime' },
  { label: 'Romance', value: 'Romance' },
];

export const STROKE_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
];

export const FILL_COLOR = [
  'rgba(0, 136, 254, 0.7)',
  'rgba(0, 196, 159, 0.7)',
  'rgba(255, 187, 40, 0.7)',
  'rgba(255, 128, 66, 0.7)',
  'rgba(136, 132, 216, 0.7)',
  'rgba(130, 202, 157, 0.7)',
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
];
