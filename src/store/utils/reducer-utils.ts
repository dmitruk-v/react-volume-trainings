const updateObject = <T>(old: T, withValues: T): T => {
  return { ...old, ...withValues };
}

type WithId<T> = T extends { id: string } ? T : never;

const updateArrayItem = <T>(oldItems: WithId<T>[], itemId: WithId<T>["id"], updateItemCallback: (item: WithId<T>) => T): T[] => {
  return oldItems.map(item => {
    if (itemId === item.id) {
      return updateItemCallback(item);
    }
    return item;
  });
}

const removeEntryByKey = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keyToRemove: K) => {
  return Object.keys(obj).reduce((updated, key) => {
    const oKey = key as K;
    if (oKey !== keyToRemove) {
      updated[oKey] = obj[oKey];
    }
    return updated;
  }, {} as T)
}

export { updateObject, updateArrayItem, removeEntryByKey };