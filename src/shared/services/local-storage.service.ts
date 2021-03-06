import { SyncDataProvider } from ".";

const LocalStorageService = <T>(key: string, transformer?: (key: string, value: any) => any): SyncDataProvider<T> => {
  if (window.localStorage === undefined)
    throw new Error("Use of LocalStorageService in environment, where window.localStorage is not available.");

  const ls = window.localStorage;

  return {
    load: () => {
      try {
        let lsData = ls.getItem(key);
        if (lsData === null) {
          return undefined;
        }
        return transformer !== undefined
          ? JSON.parse(lsData, transformer)
          : JSON.parse(lsData);
      } catch (err) {
        console.log(err);
        return undefined;
      }
    },
    save: (data: T) => {
      try {
        ls.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export { LocalStorageService };