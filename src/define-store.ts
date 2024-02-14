import { capitalizeString } from "./internal";
import { StaatShelferStore, StoreSetFn } from "./types";

/**
 * Define a store with a set function
 * @param set - The set function from Zustand
 * @param obj - The object to define the store from
 * @returns The defined store
 * @example
 * ```tsx
 * const state = create((set) => defineStore<StoreType>(set, {
 *   projectId: undefined,
 * }));
 *  ```
 *  */
export const defineStore = <T extends Record<string, unknown>>(
  set: StoreSetFn,
  obj: {
    [P in keyof T]: T[P];
  },
) => {
  return Object.fromEntries(
    Object.entries<unknown>(obj).flatMap(([key, value]) => {
      const capitalizedKey = capitalizeString(key);

      return [
        [key, value],
        [`reset${capitalizedKey}`, () => set({ [key]: value })],
        [`set${capitalizedKey}`, (item: unknown) => set({ [key]: item })],
        ...(Array.isArray(value)
          ? [
              [
                `pushTo${capitalizedKey}`,
                (item: unknown) =>
                  set((st) => ({ [key]: [...(st[key] as unknown[]), item] })),
              ],
              [
                `unshiftTo${capitalizedKey}`,
                (item: unknown) =>
                  set((st) => ({ [key]: [item, ...(st[key] as unknown[])] })),
              ],
            ]
          : [[]]),
      ];
    }),
  ) as StaatShelferStore<T>;
};
