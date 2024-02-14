import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    dts: { respectExternal: false },
  },
  clean: true,
  declaration: true,
});
