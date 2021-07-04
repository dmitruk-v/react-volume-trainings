import { Provider } from ".";

const LocalStorageProvider = <T>(key: string): Provider<T> => {
  if (window.localStorage === undefined)
    throw new Error("Use of LocalStorageProvider in environment, where window.localStorage is not available.");

  const ls = window.localStorage;

  return {
    load: () => {
      try {
        let lsData = ls.getItem(key);
        return Promise.resolve(
          lsData !== null ? JSON.parse(lsData) : lsData
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