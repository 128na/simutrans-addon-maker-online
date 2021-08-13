export const createArray = (count: number) => [...new Array(count)].map((_, i) => i);

export const createKeyPattern = (keyValue: string, keyParamsArray: string[][]) => {
  return keyParamsArray.reduce((keys, keyParams) =>
    keyParams.flatMap((p) => keys.map((k) => `${k}[${p}]`)),
    [keyValue]
  );
};
