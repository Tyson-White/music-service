import { useEffect, useState } from "react";

export const useDebounce = <ValueT>(value: ValueT, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState<ValueT>(value);

  const setValue = (value: ValueT) => setDebounceValue(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return { debounceValue, setValue };
};
