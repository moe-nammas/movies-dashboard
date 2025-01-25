import Table, { ITableProps } from '../../components/shared/table/Table';
import {
  ICleanedMovie,
  IFilter,
  IMovie,
  IMoviesActionTypes,
} from '@/interfaces';
import { useMovies } from '@/hooks/useMovies';
import { GoStarFill } from 'react-icons/go';
import styles from './styles.module.scss';
import Badge from '@/components/shared/badge/Badge';
import { COUNTRIES_OPTIONS, COUNTRY_CODE, GENRES_OPTIONS } from '@/constants';
import Filters from '@/components/shared/filters/Filters';
import { useEffect, useState } from 'react';
import { simulateApiCall } from '@/utils/simulateApiCall';
import { useMoviesContext } from '@/contexts';
import Modal from '@/components/shared/modal/Modal';
import MovieModal from '@/components/movieModal/MovieModal';
import { FaRegEye } from 'react-icons/fa6';

const Movies = () => {
  const { cleanMovieData, filterMovies } = useMovies();
  const { dispatch } = useMoviesContext();
  const [tableData, setTableData] = useState<ICleanedMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<ICleanedMovie | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilter[]>([
    {
      type: 'input',
      id: 'title',
      label: 'Title',
      placeholder: 'Search by title',
      value: null,
      searchType: 'textSearch',
    },
    {
      type: 'select',
      id: 'country',
      label: 'Country',
      placeholder: 'Filter by country',
      value: null,
      options: COUNTRIES_OPTIONS,
      searchType: 'include',
    },
    {
      type: 'select',
      id: 'genre',
      label: 'Genre',
      placeholder: 'Filter by genre',
      value: null,
      options: GENRES_OPTIONS,
      searchType: 'include',
    },
  ]);

  const tableProps: ITableProps<ICleanedMovie> = {
    title: 'Movies',
    data: [],
    columns: [
      {
        dataKey: 'title',
      },
      {
        dataKey: 'year',
      },
      {
        dataKey: 'imdb_rating',
        label: 'IMDB Rating',
        render(row) {
          return (
            <div className={`${styles['table-cell']}`}>
              <GoStarFill color='gold' />
              <span>{row.imdb_rating}/10</span>
            </div>
          );
        },
      },
      {
        dataKey: 'genre',
        label: 'genres',
        render(row) {
          return (
            <div className={`${styles['table-cell']}`}>
              {row.genre.map((item) => (
                <Badge text={item} key={item} />
              ))}
            </div>
          );
        },
      },
      {
        dataKey: 'country',
        label: 'countries',
        render(row) {
          return (
            <div className={`${styles['table-cell']}`}>
              {row.country.map((item) => (
                <img
                  key={item}
                  src={`https://flagcdn.com/${COUNTRY_CODE[item]}.svg`}
                  width='30'
                  alt={item}
                />
              ))}
            </div>
          );
        },
      },
    ],
    onRowClick(row) {
      setSelectedMovie(row);
      setShowModal(true);
    },
    actionButtons: [
      {
        label: 'View',
        onClick: (row) => {
          setSelectedMovie(row);
          setShowModal(true);
        },
        icon: <FaRegEye />,
      },
    ],

    // THE BELOW PROPS ARE FOR EXAMPLE .. UNCOMMENT TO USE
    // addButtonText: 'Add New Movie',
    // onAddButtonClick: () => alert('Add New Movie'),
  };

  const handleFilterChange = (newValue: string, id: string) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === id) {
          return { ...filter, value: newValue };
        }
        return filter;
      })
    );
  };

  useEffect(() => {
    simulateApiCall<IMovie[]>()
      .then((data) => {
        setTableData(cleanMovieData(data));
        dispatch({ type: IMoviesActionTypes.SET_MOVIES, payload: data });
        dispatch({
          type: IMoviesActionTypes.SET_CLEANED_MOVIES,
          payload: cleanMovieData(data),
        });
      })
      .catch((error) => {
        // WE CAN HANDLE ERROR IN A BETTER WAY, EITHER BY SHOWING A TOAST OR A MODAL...
        console.log(error);
      })
      .finally(() => {
        // WE CAN STOP A LOADER HERE
      });
  }, []);

  useEffect(() => {
    setTableData(filterMovies(filters));
  }, [filters]);

  return (
    <div className='full-page-wrapper'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={`${selectedMovie?.title} - ${selectedMovie?.year}`}
      >
        <MovieModal {...(selectedMovie as ICleanedMovie)} />
      </Modal>
      <Filters filters={filters} onChange={handleFilterChange} />
      <Table {...tableProps} data={tableData} />
    </div>
  );
};

export default Movies;
