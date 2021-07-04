import { Provider } from ".";

const JsonProvider = <T>(resourceUrl: string): Provider<T> => {
  if (window.fetch === undefined)
    throw new Error("Use of JsonProvider in environment, where window.fetch is not available.");

  // window.fetch("http://localhost:3000/schedule.json").then(res => res.text()).then(console.log);

  return {
    load: () => {
      return window.fetch(resourceUrl).then(response => response.json() as Promise<T>);
    },
    save: (data: T) => {
      throw new Error("save() is not implemented in JsonProvider");
    }
  }
}

export { JsonProvider };