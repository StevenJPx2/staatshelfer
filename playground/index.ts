import { create } from "zustand";
import { defineStore, selectFromStore, type StaatShelferStore } from "../src";

type ChatImage = { url: string; width: number; height: number };
type LayerKeys = "background" | "product" | "overlay" | "text" | "blue";

type StoreType = {
  projectId: string | undefined;
  loading: {
    prompt: boolean;
    uploadDataUri: boolean;
    uploadFile: boolean;
    createProject: boolean;
  };
  prompt:
    | {
        text: { template: string; elements: Set<string> };
        image: ChatImage;
        noProductImage?: ChatImage;
        blueImage?: ChatImage;
        uid: string;
        batchSize: number;
      }
    | undefined;
  draggedImageMeta: { url: string; layer: LayerKeys } | undefined;
  elements: Element[];
};

const store = create<StaatShelferStore<StoreType>>((set) =>
  defineStore<StoreType>(set, {
    projectId: undefined,
    loading: {
      prompt: false,
      uploadDataUri: false,
      createProject: false,
      uploadFile: false,
    },
    prompt: undefined,
    draggedImageMeta: undefined,
    elements: [],
  }),
);

const { elements } = selectFromStore(store, ["elements", "prompt"]);
