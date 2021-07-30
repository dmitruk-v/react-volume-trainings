import { useMemo } from "react";

type LocalStorageProvider<T> = {
  load: () => T | null,
  save: (data: T) => void
}

const useLocalStorageSync = <T>(key: string): LocalStorageProvider<T> => {

  if (window.localStorage === undefined) {
    throw new Error("LocalStorage is not supported.");
  }

  const lsProvider = useMemo(() => ({
    load() {
      const lsData = window.localStorage.getItem(key);
      if (lsData !== null) {
        try {
          return JSON.parse(lsData) as T;
        }
        catch (err) {
          // maybe it is not a JSON, let's just return a value
          console.log(err);
        }
      }
      return lsData as (T | null);
    },
    save(data: T) {
      try {
        window.localStorage.setItem(key, JSON.stringify(data));
      }
      catch (err) {
        console.log(err);
      }
    }
  }), [key]);

  return lsProvider;
}

export { useLocalStorageSync };