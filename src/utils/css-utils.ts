type ClassNamesResolver = { [key: string]: boolean };

const getClasses = (...names: (string | ClassNamesResolver)[]): string => {
  return names.reduce<string>((result, name) => {
    if (typeof name === "object") {
      for (const cKey in name) {
        if (!Object.prototype.hasOwnProperty.call(name, cKey)) continue;
        if (name[cKey] === true) {
          result += (" " + cKey);
        }
      }
    } else {
      result += (" " + name);
    }
    return result;
  }, "").trim();
}

export { getClasses };