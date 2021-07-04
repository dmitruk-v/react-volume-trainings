interface Provider<T> {
  load: () => Promise<T | null>;
  save: (schedule: T) => Promise<void>;
}

export type { Provider }
export { LocalStorageProvider } from "./local-storage-provider";
export { JsonProvider } from "./json-provider";