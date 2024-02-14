# Staatshelfer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

This is a light wrapper over Zustand to provide max safety with the least compromise.

Have you found yourself defining the same "actions" or "functions" for certain variables over and over again?

Example:
```ts
type Store = {
  userId: string | undefined;
};

const useMainStore = create<Store>((set) => ({
  userId: undefined,
  setUserId: (userId: string | undefined) => set({ userId }),
}));
```

For every single new store item you create, you might have to create the same utility functions over and over again, making it less productive and laborious to maintain.

**With** Staatshelfer:

`store.ts`
```ts
import { defineStore, type StaatShelferStore } from "staatshelfer";

type Store = {
  userId: string | undefined;
};

const useMainStore = create<StaatShelferStore<Store>>((set) =>
  // throws an error if your definition for defaults don't match the Store type
  defineStore(set, {
    userId: undefined,
  }),
);
```

`component.tsx`
```ts
import { useMainStore } from "@/store";
import { selectFromStore } from "staatshelfer";

export function Component() {
  // selectFromStore selects all the relevant functions by default
  const { userId, setUserId, resetUserId } = selectFromStore(
    useMainStore,
    ["userId"], // this is auto-completed only with the main keys!
  );

  return;
}
```

### Default functions

For non-array and array types:
- `setKey` - function to set the `key` as a whole
- `resetKey` - function to reset to the initially defined value.

For **only** array types:
- `pushToKey` - to push an element to the `key` array.
- `unshiftToKey` - to unshift an element to the `key` array.

## Usage

Install package using your favorite package manager:

```sh
# pnpm
pnpm install staatshelfer zustand
```

Import:

```js
// ESM
import {} from "staatshelfer";

// CommonJS
const {} = require("staatshelfer");
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/staatshelfer?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/staatshelfer
[npm-downloads-src]: https://img.shields.io/npm/dm/staatshelfer?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/staatshelfer

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/unjs/staatshelfer/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/staatshelfer

[bundle-src]: https://img.shields.io/bundlephobia/minzip/staatshelfer?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=staatshelfer -->
