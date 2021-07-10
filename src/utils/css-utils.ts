
const getClasses = (clsObj: { [key: string]: boolean }): string => {
  let result = "";
  for (const cKey in clsObj) {
    if (!Object.prototype.hasOwnProperty.call(clsObj, cKey)) continue;
    if (clsObj[cKey] === true) {
      result += (" " + cKey);
    }
  }
  return result.trim();
}

export { getClasses };