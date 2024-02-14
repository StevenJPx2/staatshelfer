export type StoreSetFn<T extends object = Record<string, unknown>> = (
  partial: T | ((arg: T) => Partial<T>),
) => void;

export type StaatShelferStore<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
  Store extends Record<string, unknown> = {
    [P in K as
      | (T[P] extends unknown[]
          ?
              | `pushTo${Capitalize<P & string>}`
              | `unshiftTo${Capitalize<P & string>}`
          : never)
      | `set${Capitalize<P & string>}`
      | `reset${Capitalize<P & string>}`
      | P]: T[P];
  },
> = {
  [P in keyof Store]: P extends `pushTo${string}` | `unshiftTo${string}`
    ? (arg: Store[P] extends (infer U)[] ? U : never) => void
    : P extends `set${string}`
      ? (arg: Store[P]) => void
      : P extends `reset${string}`
        ? () => void
        : Store[P];
};
