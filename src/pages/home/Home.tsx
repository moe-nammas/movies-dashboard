import styles from './styles.module.scss';
import StatsCard from '@/components/statsCard/StatsCard';
import { useMovies } from '@/hooks/useMovies';
import { ICleanedMovie, IMovie } from '@/interfaces';
import { simulateApiCall } from '@/utils/simulateApiCall';
import { useEffect, useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { TbTrophyOff } from 'react-icons/tb';
import { GoStarFill } from 'react-icons/go';
import { LuStarOff } from 'react-icons/lu';
import PieChart from '@/components/shared/charts/PieChart';
import LineChart from '@/components/shared/charts/LineChart';
import BarChart from '@/components/shared/charts/BarChart';

const Home = () => {
  const [moviesWithTheMostOscars, setMoviesWithTheMostOscars] =
    useState<ICleanedMovie | null>(null);
  const [moviesWithTheMostOscarsLose, setMoviesWithTheMostOscarsLose] =
    useState<ICleanedMovie | null>(null);
  const [highestRatedMovie, setHighestRatedMovie] =
    useState<ICleanedMovie | null>(null);
  const [lowestRatedMovie, setLowestRatedMovie] =
    useState<ICleanedMovie | null>(null);
  const [oscarsPerGenre, setOscarsPerGenre] = useState<unknown[] | null>([]);
  const [oscarsPerCountry, setOscarsPerCountry] = useState<unknown[] | null>(
    []
  );
  const [oscarNominationsAndWindPerYear, setOscarNominationsAndWindPerYear] =
    useState<unknown[] | null>([]);
  const [moviesOscarsAndNominations, setMoviesOscarsAndNominations] = useState<
    unknown[] | null
  >([]);

  const {
    cleanMovieData,
    findMostOscarWinningMovie,
    findMostOscarLosingMovie,
    findHighestRatedMovies,
    findLowestRatedMovies,
    getOscarsPerGenre,
    getOscarsPerCountry,
    nominationsAndWinsPerYear,
    getMoviesOscarsAndNominations,
  } = useMovies();

  useEffect(() => {
    simulateApiCall<IMovie[]>()
      .then((data) => {
        const movies = cleanMovieData(data);
        console.log(movies);
        setMoviesWithTheMostOscars(findMostOscarWinningMovie(movies));
        setMoviesWithTheMostOscarsLose(findMostOscarLosingMovie(movies));
        setHighestRatedMovie(findHighestRatedMovies(movies));
        setLowestRatedMovie(findLowestRatedMovies(movies));
        setOscarsPerGenre(getOscarsPerGenre(movies));
        setOscarsPerCountry(getOscarsPerCountry(movies));
        setOscarNominationsAndWindPerYear(nominationsAndWinsPerYear(movies));
        setMoviesOscarsAndNominations(getMoviesOscarsAndNominations(movies));
      })
      .catch((error) => {
        // WE CAN HANDLE ERROR IN A BETTER WAY, EITHER BY SHOWING A TOAST OR A MODAL...
        console.log(error);
      })
      .finally(() => {
        // WE CAN STOP A LOADER HERE
      });
  }, []);

  return (
    <div className={styles['home-container']}>
      <div className={styles['quick-stats']}>
        <StatsCard
          title={'Most Oscars Wins'}
          value={moviesWithTheMostOscars?.title ?? ''}
          icon={
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div>{moviesWithTheMostOscars?.oscar_winning}</div>
              <FaTrophy color='gold' />
            </div>
          }
        />
        <StatsCard
          title={'Most Oscars Loses'}
          value={moviesWithTheMostOscarsLose?.title ?? ''}
          icon={
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div>
                {(moviesWithTheMostOscarsLose?.oscar_nominations ?? 0) -
                  (moviesWithTheMostOscarsLose?.oscar_winning ?? 0)}
              </div>
              <TbTrophyOff color='gold' />
            </div>
          }
        />
        <StatsCard
          title={'Highest Rated Movie'}
          value={highestRatedMovie?.title ?? ''}
          icon={
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div>{highestRatedMovie?.imdb_rating}</div>
              <GoStarFill color='gold' />
            </div>
          }
        />
        <StatsCard
          title={'Lowest Rated Movie'}
          value={lowestRatedMovie?.title ?? ''}
          icon={
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div>{lowestRatedMovie?.imdb_rating}</div>
              <LuStarOff color='gold' />
            </div>
          }
        />
      </div>
      <div className={styles['charts-container']}>
        <div className={styles['chart-card']}>
          <label>Oscars Per Genre</label>
          <PieChart data={oscarsPerGenre ?? []} />
        </div>
        <div className={styles['chart-card']}>
          <label>Oscars Per Country</label>
          <PieChart data={oscarsPerCountry ?? []} />
        </div>
      </div>
      <div className={styles['chart-card']}>
        <label>Oscars Per Year</label>
        <LineChart data={oscarNominationsAndWindPerYear ?? []} />
      </div>
      <div className={styles['chart-card']}>
        <label>Movies With Oscars And Nominations</label>
        <BarChart data={moviesOscarsAndNominations ?? []} />
      </div>
    </div>
  );
};

export default Home;
