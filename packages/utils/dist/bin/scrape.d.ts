export declare function asyncMap<E, T>(array: E[], callback: (elm: E, index: number, array: E[]) => Promise<T>): Promise<T[]>;
