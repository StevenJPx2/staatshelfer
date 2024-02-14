export const capitalizeString = <T extends string>(str: T) =>
  (str.slice(0, 1).toUpperCase() + str.slice(1)) as Capitalize<T>;
