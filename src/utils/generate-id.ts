type IdGeneratorOptions = {
  chars: number,
  prefix: string,
  suffix: string
};

type IdGenerator = (...args: any) => string;

const defaultOptions: IdGeneratorOptions = {
  chars: 8,
  prefix: "",
  suffix: ""
}

const getRandomNumber = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max - min))
};

const base64Generator = (size: number): string => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
  let result = "";
  for (let i = 0; i < size; i++) {
    const randIndex = getRandomNumber(0, alphabet.length);
    result += alphabet[randIndex];
  }
  return result;
}

const createId = (options: Partial<IdGeneratorOptions> = defaultOptions): string => {
  const userOptions = { ...defaultOptions, ...options };
  return userOptions.prefix
    + new Date().getTime().toString(32) + "-"
    + base64Generator(userOptions.chars)
    + userOptions.suffix;
}

const createIdGenerator = (options?: Partial<IdGeneratorOptions>): IdGenerator => {
  return () => createId(options);
}

// const testGeneratorForDuplicates = (generator: IdGenerator, iterations: number) => {
//   let id = generator();
//   for (let index = 0; index < iterations; index++) {
//     if (id === generator()) {
//       console.log("DUPLICATE!", id);
//     }
//   }
//   console.log("UNIQUE!", id);
// }

export { getRandomNumber, createId, createIdGenerator, base64Generator };