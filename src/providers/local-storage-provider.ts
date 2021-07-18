import { Provider } from ".";

const LocalStorageProvider = <T>(key: string): Provider<T> => {
  if (window.localStorage === undefined)
    throw new Error("Use of LocalStorageProvider in environment, where window.localStorage is not available.");

  const ls = window.localStorage;

  return {
    load: (reviver?: (k: string, v: any) => void) => {
      try {
        let lsData = ls.getItem(key);
        if (lsData === null) {
          return Promise.reject(`Key "${key}" not found in LocalStorage`);
        }
        return Promise.resolve<T>(
          reviver !== undefined
            ? JSON.parse(lsData, reviver)
            : JSON.parse(lsData)
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    save: (data: T) => {
      try {
        return Promise.resolve(
          ls.setItem(key, JSON.stringify(data))
        );
      } catch (err) {
        return Promise.reject(err);
      }

    }
  }
}

export { LocalStorageProvider };