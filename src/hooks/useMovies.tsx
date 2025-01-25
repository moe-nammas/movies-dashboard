import { useMoviesContext } from '@/contexts';
import { ICleanedMovie, IFilter, IMovie } from '@/interfaces';

export const useMovies = () => {
  const { state } = useMoviesContext();

  const cleanMovieData = (movies: IMovie[]): ICleanedMovie[] => {
    const uniqueMovies = new Map();

    movies.forEach((movie) => {
      if (
        !uniqueMovies.has(movie.title) ||
        uniqueMovies.get(movie.title).imdb_rating < movie.imdb_rating
      ) {
        const cleanedMovie: ICleanedMovie = {
          ...movie,
          year: parseInt(movie.year.toString()),
          imdb_rating: parseFloat(movie.imdb_rating.toString()),
          oscar_nominations: parseInt(movie.oscar_nominations.toString()),
          oscar_winning: parseInt(movie.oscar_winning.toString()),
        };
        uniqueMovies.set(movie.title, cleanedMovie);
      }
    });
    return Array.from(uniqueMovies.values());
  };

  const getAllGenres = () => {
    const genres = new Set();
    state.cleanedMovies.forEach((movie) => {
      movie.genre.forEach((g) => genres.add(g));
    });
    return Array.from(genres);
  };

  const getAllCountries = () => {
    const countries = new Set();
    state.cleanedMovies.forEach((movie) => {
      movie.country.forEach((c) => countries.add(c));
    });
    return Array.from(countries);
  };

  const getDecade = (year: number) => Math.floor(year / 10) * 10;

  const calculateSuccessRatio = (movie: ICleanedMovie) => {
    if (movie.oscar_nominations === 0) return 0;
    return (movie.oscar_winning / movie.oscar_nominations) * 100;
  };

  const textSearch = ({
    value,
    key,
    movie,
  }: {
    value: string | null;
    key: string;
    movie: ICleanedMovie;
  }) => {
    if (value && key && movie[key as keyof ICleanedMovie]) {
      return movie[key as keyof ICleanedMovie]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
        ? movie
        : null;
    }
    return null;
  };

  const includeSearch = ({
    key,
    value,
    movie,
  }: {
    value: string | null;
    key: string;
    movie: ICleanedMovie;
  }) => {
    if (value && key && movie[key as keyof ICleanedMovie]) {
      if (movie[key as keyof ICleanedMovie] === null) return false;
      const fieldToSearch = movie[key as keyof ICleanedMovie] as string[];
      return fieldToSearch.includes(value) ? movie : null;
    }
    return null;
  };

  const filterMovies = (filters: IFilter[]): ICleanedMovie[] => {
    const filteredMovies: ICleanedMovie[] = [];
    filters.forEach((filter) => {
      state.cleanedMovies.forEach((movie) => {
        const movieAlreadyAdded = filteredMovies.find(
          (item) => item.title === movie.title
        );
        if (
          filter.searchType === 'textSearch' &&
          filter.value &&
          !movieAlreadyAdded
        ) {
          const result = textSearch({
            value: filter.value,
            key: filter.id,
            movie,
          });
          if (result) filteredMovies.push(result);
        } else if (
          filter.searchType === 'include' &&
          filter.value &&
          !movieAlreadyAdded
        ) {
          const result = includeSearch({
            key: filter.id,
            value: filter.value,
            movie,
          });
          if (result) filteredMovies.push(result);
        }
      });
    });
    return filters.some((filter) => !!filter.value)
      ? filteredMovies
      : state.cleanedMovies;
  };

  const findMostOscarWinningMovie = (
    movies: ICleanedMovie[]
  ): ICleanedMovie | null => {
    return movies.reduce((maxOscarMovie, currentMovie) => {
      // console.log({ maxOscarMovie, currentMovie });
      return !maxOscarMovie ||
        currentMovie.oscar_winning > maxOscarMovie.oscar_winning
        ? currentMovie
        : maxOscarMovie;
    }, null as ICleanedMovie | null);
  };

  const findMostOscarLosingMovie = (
    movies: ICleanedMovie[]
  ): ICleanedMovie | null => {
    return movies.reduce((mostLossMovie, currentMovie) => {
      const currentLosses =
        currentMovie.oscar_nominations - currentMovie.oscar_winning;
      const maxLosses = mostLossMovie
        ? mostLossMovie.oscar_nominations - mostLossMovie.oscar_winning
        : -1;

      return currentLosses > maxLosses ? currentMovie : mostLossMovie;
    }, null as ICleanedMovie | null);
  };

  const findHighestRatedMovies = (movies: ICleanedMovie[]) => {
    return movies.reduce((highestRateMovie, currentMovie) => {
      return !highestRateMovie ||
        currentMovie.imdb_rating > highestRateMovie.imdb_rating
        ? currentMovie
        : highestRateMovie;
    }, null as ICleanedMovie | null);
  };

  const findLowestRatedMovies = (movies: ICleanedMovie[]) => {
    return movies.reduce((lowestRatedMovie, currentMovie) => {
      return !lowestRatedMovie ||
        currentMovie.imdb_rating < lowestRatedMovie.imdb_rating
        ? currentMovie
        : lowestRatedMovie;
    }, null as ICleanedMovie | null);
  };

  const getOscarsPerGenre = (movies: ICleanedMovie[]) => {
    const genreOscars = movies.reduce((accumulator, movie) => {
      movie.genre.forEach((genre) => {
        accumulator[genre] = (accumulator[genre] || 0) + movie.oscar_winning;
      });
      return accumulator;
    }, {} as Record<string, number>);

    return Object.entries(genreOscars).map(([genre, oscars]) => ({
      name: genre,
      value: oscars,
    }));
  };

  const getOscarsPerCountry = (movies: ICleanedMovie[]) => {
    const countryOscars = movies.reduce((accumulator, movie) => {
      movie.country.forEach((country) => {
        accumulator[country] =
          (accumulator[country] || 0) + movie.oscar_winning;
      });
      return accumulator;
    }, {} as Record<string, number>);

    return Object.entries(countryOscars).map(([country, oscars]) => ({
      name: country,
      value: oscars,
    }));
  };

  const nominationsAndWinsPerYear = (movies: ICleanedMovie[]) => {
    const processedData: {
      [key: number]: { year: number; nominations: number; wins: number };
    } = {};
    movies.forEach((movie) => {
      if (!processedData[movie.year]) {
        processedData[movie.year] = {
          year: movie.year,
          nominations: 0,
          wins: 0,
        };
      }
      processedData[movie.year].nominations += movie.oscar_nominations;
      processedData[movie.year].wins += movie.oscar_winning;
    });

    return Object.values(processedData).sort((a, b) => a.year - b.year);
  };

  const getMoviesOscarsAndNominations = (movies: ICleanedMovie[]) => {
    return movies.map((movie) => ({
      title: movie.title,
      oscar_nominations: movie.oscar_nominations,
      oscar_winning: movie.oscar_winning,
    }));
  };

  return {
    cleanMovieData,
    getAllGenres,
    getAllCountries,
    getDecade,
    calculateSuccessRatio,
    filterMovies,
    findMostOscarWinningMovie,
    findMostOscarLosingMovie,
    findHighestRatedMovies,
    findLowestRatedMovies,
    getOscarsPerGenre,
    getOscarsPerCountry,
    nominationsAndWinsPerYear,
    getMoviesOscarsAndNominations,
  };
};
