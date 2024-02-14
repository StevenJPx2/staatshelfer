import type { StoreApi, UseBoundStore } from "zustand";
import { capitalizeString } from "./internal";

/**
 * Selects a subset of the store and returns a new store with only the selected keys and its related functions.
 * @param store - The store to select from
 * @param select - The keys to select
 * @returns The selected store
 * @example
 * ```tsx
 * const state = selectFromStore(store, ["elements", "prompt"]);
 * ```
 * */
export const selectFromStore = <
  T extends Record<string, unknown>,
  K extends {
    [P in keyof T as T[P] extends (...args: never[]) => unknown
      ? never
      : P]: T[P];
  },
  U extends (keyof K)[],
  Store extends Record<string, unknown> = {
    [P in U[number] as P extends keyof T
      ?
          | keyof {
              [X in keyof T as X extends `${string}${Capitalize<P & string>}`
                ? X
                : never]: P;
            }
          | P
      : never]: P extends keyof T ? T[P] : never;
  },
>(
  store: UseBoundStore<StoreApi<T>>,
  select: U,
) =>
  store((st) => {
    const obj: Record<string, unknown> = {};
    for (const key of select) {
      const capitalizedKey = capitalizeString(key as string);
      obj[key as string] = st[key as keyof T];
      obj[`reset${capitalizedKey}`] = st[`reset${capitalizedKey}`];
      obj[`set${capitalizedKey}`] = st[`set${capitalizedKey}`];
      if (`pushTo${capitalizedKey}` in st) {
        obj[`pushTo${capitalizedKey}`] = st[`pushTo${capitalizedKey}`];
        obj[`unshiftTo${capitalizedKey}`] = st[`unshiftTo${capitalizedKey}`];
      }
    }
    return obj as {
      [P in keyof Store]: P extends keyof T ? T[P] : never;
    };
  });
