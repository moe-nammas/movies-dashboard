import { ICleanedMovie } from '@/interfaces';
import styles from './styles.module.scss';
import { GoStarFill } from 'react-icons/go';
import { FaTrophy } from 'react-icons/fa';
import { COUNTRY_CODE } from '@/constants';
import Badge from '../shared/badge/Badge';

const MovieModal = ({
  genre,
  country,
  imdb_rating,
  oscar_nominations,
  oscar_winning,
  cast,
  language,
  oscar_nominations_list,
  oscar_winning_list,
}: ICleanedMovie) => {
  return (
    <div className={styles['movie-modal-container']}>
      <div className={styles['movie-rating-oscars-container']}>
        <div className={styles['movie-rating-container']}>
          <GoStarFill color='gold' size={24} />
          <span className={styles['imdb-rating']}>{imdb_rating}/10</span>
        </div>
        <div className={styles['movie-rating-container']}>
          <FaTrophy color='gold' size={24} />
          <span className={styles['imdb-rating']}>
            {oscar_winning}/{oscar_nominations}
          </span>
        </div>
      </div>
      <div>
        <h3>Oscar Nomination List</h3>
        {oscar_nominations_list.map((item) => (
          <div className={styles['oscars-list']} key={item}>
            <div>- {item}</div>
            {oscar_winning_list.includes(item) && (
              <FaTrophy color='gold' size={12} />
            )}
          </div>
        ))}
      </div>
      <div>
        <h3>Cast</h3>
        {cast.map((item) => (
          <div className={styles['oscars-list']} key={item}>
            <div>- {item}</div>
          </div>
        ))}
      </div>
      <div>
        <h3>Countries</h3>
        <div className={styles['countries-container']}>
          {country.map((item) => (
            <img
              key={item}
              src={`https://flagcdn.com/${COUNTRY_CODE[item]}.svg`}
              width='30'
              alt={item}
            />
          ))}
        </div>
      </div>
      <div>
        <h3>Genres</h3>
        <div className={styles['countries-container']}>
          {genre.map((item) => (
            <Badge text={item} key={item} />
          ))}
        </div>
      </div>
      <div>
        <h3>Languages</h3>
        <div className={styles['countries-container']}>
          {language.map((item) => (
            <Badge text={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
