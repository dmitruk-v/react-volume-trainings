interface Provider<T> {
  load: (reviver?: (k: string, v: any) => void) => Promise<T>;
  save: (schedule: T) => Promise<void>;
}

export type { Provider }
export { LocalStorageProvider } from "./local-storage-provider";
export { JsonProvider } from "./json-provider";