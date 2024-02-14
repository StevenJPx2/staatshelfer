import { expect, it, describe, expectTypeOf } from "vitest";
import { create } from "zustand";
import {
  selectFromStore,
  defineStore,
  StoreSetFn,
  StaatShelferStore,
} from "../src";

type StoreType = {
  projectId: string | undefined;
  loading: {
    prompt: boolean;
    uploadDataUri: boolean;
    uploadFile: boolean;
    createProject: boolean;
  };
  elements: string[];
};

const set: StoreSetFn = () => {};

describe("staatshelfer", () => {
  const staat = defineStore<StoreType>(set, {
    projectId: undefined,
    loading: {
      prompt: false,
      uploadDataUri: false,
      createProject: false,
      uploadFile: false,
    },
    elements: [],
  });

  const useStaat = create<StaatShelferStore<StoreType>>(() => staat);

  it("will create a valid state", () => {
    if ("projectId" in staat) {
      expect(staat.projectId).toEqual(undefined);
      expect(staat.setProjectId).toBeInstanceOf(Function);
      expect(staat.resetProjectId).toBeInstanceOf(Function);
    } else {
      throw new Error("projectId not found in staat");
    }

    if ("loading" in staat) {
      expect(staat.loading.prompt).toEqual(false);
      expect(staat.setLoading).toBeInstanceOf(Function);
      expect(staat.resetLoading).toBeInstanceOf(Function);
    }

    if ("elements" in staat) {
      expect(staat.elements).toEqual([]);
      expect(staat.setElements).toBeInstanceOf(Function);
      expect(staat.resetElements).toBeInstanceOf(Function);
      expect(staat.pushToElements).toBeInstanceOf(Function);
      expect(staat.unshiftToElements).toBeInstanceOf(Function);
    } else {
      throw new Error("elements not found in staat");
    }

    expectTypeOf(staat).toEqualTypeOf<StaatShelferStore<StoreType>>();
  });

  it("will create a valid useStaat", () => {
    const state = useStaat();
    expectTypeOf(state).toEqualTypeOf<StaatShelferStore<StoreType>>();
    expect(state.projectId).toEqual(undefined);
    expect(state.loading.prompt).toEqual(false);
    expect(state.elements).toEqual([]);
    expectTypeOf(state.setProjectId).toEqualTypeOf<
      (arg: StoreType["projectId"]) => void
    >();
    expectTypeOf(state.setLoading).toEqualTypeOf<
      (arg: StoreType["loading"]) => void
    >();
    expectTypeOf(state.setElements).toEqualTypeOf<
      (arg: StoreType["elements"]) => void
    >();
    expectTypeOf(state.resetProjectId).toEqualTypeOf<() => void>();
    expectTypeOf(state.resetLoading).toEqualTypeOf<() => void>();
    expectTypeOf(state.resetElements).toEqualTypeOf<() => void>();
    expectTypeOf(state.pushToElements).toEqualTypeOf<(arg: string) => void>;
    expectTypeOf(state.unshiftToElements).toEqualTypeOf<(arg: string) => void>;
  });

  it("will select from store", () => {
    const state = selectFromStore(useStaat, ["elements"]);
    expect(state.elements).toEqual([]);
    expectTypeOf(state.setElements).toEqualTypeOf<
      (arg: StoreType["elements"]) => void
    >();
    expectTypeOf(state.pushToElements).toEqualTypeOf<(arg: string) => void>;
    expectTypeOf(state.unshiftToElements).toEqualTypeOf<(arg: string) => void>;
    expectTypeOf(state.resetElements).toEqualTypeOf<() => void>();
    expect(state).not.toHaveProperty("projectId");
  });
});
