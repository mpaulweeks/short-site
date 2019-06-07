export function sortObjs<T>(arr: Array<T>, callback: (elm: T) => any) {
  function compare(a: T, b: T) {
    const valA = callback(a);
    const valB = callback(b);
    if (valA > valB) {
      return 1;
    } else if (valA < valB) {
      return -1;
    }
    return 0;
  }
  const sorted = arr.concat();
  sorted.sort(compare);
  return sorted;
}

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

export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}
