import data from '@data/movies.json';

export const simulateApiCall = <T>(delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as T);
    }, delay);
  });
};
