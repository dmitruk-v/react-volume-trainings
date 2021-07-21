import { useMemo } from "react";

type LocalStorageAsyncProvider<T> = {
  load: () => Promise<T>,
  save: (data: T) => Promise<void>
}

const useLocalStorage = <T>(key: string, transformer?: (key: any, value: any) => any): LocalStorageAsyncProvider<T> => {

  if (window.localStorage === undefined) {
    throw new Error("LocalStorage is not supported.");
  }

  const lsProvider = useMemo<LocalStorageAsyncProvider<T>>(() => ({
    load() {
      return new Promise((resolve, reject) => {
        const lsData = window.localStorage.getItem(key);
        if (lsData === null) {
          return reject(`Key "${key}" is not found in Local Storage`);
        }
        try {
          resolve(JSON.parse(lsData, transformer) as T);
        }
        catch (err) {
          reject(err);
        }
      });
    },
    save(data: T) {
      return new Promise<void>((resolve, reject) => {
        try {
          window.localStorage.setItem(key, JSON.stringify(data));
        }
        catch (err) {
          reject(err);
        }
        resolve();
      });
    }
  }), [key, transformer]);

  return lsProvider;
}

export { useLocalStorage };