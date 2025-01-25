import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value && delay) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cleanup the timeout if value or delay changes
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
