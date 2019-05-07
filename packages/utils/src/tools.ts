export async function asyncMap<E, T>(
  array: E[],
  callback: (elm: E, index: number, array: E[]) => Promise<T>,
): Promise<T[]> {
  // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  const output: T[] = [];
  for (let index = 0; index < array.length; index++) {
    const result = await callback(array[index], index, array);
    output.push(result);
  }
  return output;
}
