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

export { updateObject, updateArrayItem };