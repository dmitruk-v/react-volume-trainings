interface AsyncProvider<T> {
  load: (reviver?: (k: string, v: any) => void) => Promise<T>;
  save: (schedule: T) => Promise<void>;
}

interface SyncProvider<T> {
  load: (reviver?: (k: string, v: any) => void) => T;
  save: (schedule: T) => void;
}

export type { SyncProvider, AsyncProvider }
export { LocalStorageProvider } from "./local-storage-provider";
export { JsonProvider } from "./json-provider";