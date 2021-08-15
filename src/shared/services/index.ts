type SyncDataProvider<T> = {
  load: () => T | undefined,
  save: (data: T) => void
}

type AsyncDataProvider<T> = {
  load: () => Promise<T | undefined>,
  save: (data: T) => Promise<void>
}

export type { SyncDataProvider, AsyncDataProvider }

export * from "./json.service";
export * from "./local-storage.service";
export * from "./geolocation.service";