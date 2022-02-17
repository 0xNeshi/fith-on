import { useCallback, useState } from "react";

export default function usePersistentState(key, defaultValue = undefined) {
  const [value, setValue] = useState(() => {
    const oldValue = JSON.parse(localStorage.getItem(key));
    return oldValue || defaultValue;
  });

  const setPersistentValue = useCallback(
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key]
  );

  return [value, setPersistentValue];
}
